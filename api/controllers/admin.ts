import express, { Request, Response } from 'express';
import CompanyServices from '../models/admin';
import { JWTMiddleware } from '../helpers/jwt.middleware';

const router = express.Router();
const companyServices = new CompanyServices();

const applyJWTConditionally = (req: Request, res: Response, next: any) => {
  JWTMiddleware.verifyToken(req, res, next);
};

router.get('/login', applyJWTConditionally, login);

router.post('/addProperty', applyJWTConditionally, addProperty);
router.post('/distributeRent', applyJWTConditionally, distributeRent);
router.get('/viewUsers', applyJWTConditionally, viewUsers);

async function login(req: Request, res: Response) {
  try {
    const result = await companyServices.login();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error viewing users', error });
  }
}


async function addProperty(req: Request, res: Response) {
  try {
    const result = await companyServices.addProperty(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error adding property', error });
  }
}

async function distributeRent(req: Request, res: Response) {
  try {
    const result = await companyServices.distributeRent(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error distributing rent', error });
  }
}

async function viewUsers(req: Request, res: Response) {
  try {
    const result = await companyServices.viewUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error viewing users', error });
  }
}


export default router;
