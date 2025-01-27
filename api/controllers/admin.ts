import express, { Request, Response } from 'express';
import { JWTMiddleware } from '../helpers/jwt.middleware';

const router = express.Router();

const applyJWTConditionally = (req: Request, res: Response, next: any) => {
  JWTMiddleware.verifyToken(req, res, next);
};



export default router;
