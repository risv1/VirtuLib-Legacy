import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config()
const secret = process.env.JWT_SECRET!;

export const sessionMiddleware = (app: express.Application) => {
  app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: "none" }
  }));
};