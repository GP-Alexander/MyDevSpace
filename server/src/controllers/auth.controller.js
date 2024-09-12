import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userFound = await User.findOne({ $or: [{ email }, { username }] });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = await createAccessToken({
      id: userFound._id,
      role: userFound.username,
    });

    // Añadir opciones de seguridad a la cookie
    res.cookie("token", token, {
     // httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo seguro en producción
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    res.status(200).json({ message: "Login success" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, role, permissions, status, avatar } = req.body;

    const userFound = await User.findOne({ $or: [{ email }, { username }] });
    if (userFound) {
      return res.status(400).json({ message: "The email or username is already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: passwordHash,
      role,
      permissions,
      status,
      avatar,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, {
    //httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    const { password: _, ...userWithoutPassword } = userSaved.toObject();
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userFound = await User.findById(decoded.id);
      if (!userFound) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({
        id: userFound._id,
        role: userFound.username,
        email: userFound.email,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
   //httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    expires: new Date(0), // Correct spelling and expiration setting
  });

  res.status(200).json({ message: "Logout success" });
};
