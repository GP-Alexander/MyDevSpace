import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    const SecretToken = process.env.TOKEN_SECRET;

    if (!SecretToken) {
      return res.status(500).json({ message: "Server configuration error: TOKEN_SECRET is not defined" });
    }

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, SecretToken, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
