import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import { UserModel } from "../models/users";
import dotenv from "dotenv";

dotenv.config();
const secret: string = process.env.JWT_SECRET!;

export const registerUser = async (req: Request, res: Response) => {
  try {

    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

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
    res.status(200).json({ message: "User created" });
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
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

    const token = jwt.sign(
      { id: user.id,name: user.name, email: user.email, role: user.role },
      secret,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res
      .status(200)
      .json({
        message: "Logged in",
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logOut = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

export const checkUserRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const decoded: string | JwtPayload = verify(token, secret);
    const userRole = (decoded as JwtPayload).role;
    if (userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
