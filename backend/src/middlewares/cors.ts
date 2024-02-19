import express from 'express';
import cors from 'cors';

export const corsMiddleware = (app: express.Application) => {
  app.use(cors(
    {
      origin: 'http://localhost:5173',
      credentials: true,
    }
  ));
};


