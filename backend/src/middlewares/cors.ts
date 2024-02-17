import express from 'express';
import cors from 'cors';

export const corsMiddleware = (app: express.Application) => {
  app.use(cors());
};


