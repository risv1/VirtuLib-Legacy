import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/users";
import dotenv from 'dotenv';

dotenv.config();
const secret: string = process.env.JWT_SECRET!;

export const registerUser = async (req: Request, res: Response) => {
    try {  
      const hashPass = await bcrypt.hash(req.body.password, 10);
    const user = {
      id: Math.random()
        .toString(36)
        .substring(2, 2 + 10),
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
      role: "user",
    };
    const newUser = new UserModel(user);
    await newUser
      .save()
      .then((user) => {
        console.log("User created:", user);
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
        expiresIn: "24h", 
      });
      res.cookie("token", token, { httpOnly: true });

      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const logOut = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.redirect("/");
}
