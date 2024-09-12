import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});
const secret = process.env.TOKEN_SECRET;

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
