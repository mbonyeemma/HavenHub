import express, { Request, Response } from 'express';
import CompanyServices from '../models/accounts';
import { JWTMiddleware } from '../helpers/jwt.middleware';

const router = express.Router();
const companyServices = new CompanyServices();

const applyJWTConditionally = (req: Request, res: Response, next: any) => {
  JWTMiddleware.verifyToken(req, res, next);
};

router.post('/', welcome);
router.post('/signup', signup);
router.post('/login', login);
router.post('/updateProfile', updateProfile);
router.post('/changePassword', applyJWTConditionally, changePassword);

async function updateProfile(req: Request, res: Response) {
  try {
    const result = await companyServices.updateProfile(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error adding company', error });
  }
}

async function changePassword(req: Request, res: Response) {
  try {
    const result = await companyServices.changePassword(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error adding company', error });
  }
}

async function welcome(req: Request, res: Response) {
  try {
    res.status(200).json("MUDA PROPERTIES");
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
}

async function login(req: Request, res: Response) {
  try {
    const result = await companyServices.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
}

async function signup(req: Request, res: Response) {
  try {
    const result = await companyServices.signup(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error });
  }
}



export default router;
