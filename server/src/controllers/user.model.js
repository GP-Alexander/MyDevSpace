import userModel from '../models/user.model.js';
import mongoose from 'mongoose';

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        if (users.length === 0) {
            return res.status(200).json({ message: "No users found", data: [] });
        }
        res.status(200).json({ message: 'Users retrieved successfully', data: users });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving users', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`, data: null });
        }
        res.status(200).json({ message: `User with id ${id} retrieved successfully`, data: user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving user', error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, role, permissions, status, avatar } = req.body;
        const newUser = new userModel({
            firstname,
            lastname,
            username,
            email,
            password,
            role,
            permissions,
            status,
            avatar
        });
        const userSaved = await newUser.save();

        res.status(201).json({ message: 'User created successfully', data: userSaved });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating user', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, username, email, password, role, permissions, status, avatar } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: `Invalid user ID`, data: null });
        }

        const updatedUser = { firstname, lastname, username, email, password, role, permissions, status, avatar };
        const result = await userModel.findByIdAndUpdate(id, updatedUser, { new: true });

        if (!result) {
            return res.status(404).json({ message: `User with id ${id} not found`, data: null });
        }

        res.status(200).json({ message: `User with id ${id} updated successfully`, data: result });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating user', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: `Invalid user ID`, data: null });
        }

        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`, data: null });
        }

        res.status(200).json({ message: `User with id ${id} deleted successfully`, data: user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting user', error: error.message });
    }
};
