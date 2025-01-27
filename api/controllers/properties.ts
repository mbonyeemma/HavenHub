import express, { Request, Response, NextFunction } from 'express';
import { JWTMiddleware } from '../helpers/jwt.middleware';
import Property from '../models/property';

const router = express.Router();
const admin = new Property();

// Middleware to apply JWT conditionally
function applyJWTConditionally(req: Request, res: Response, next: NextFunction): void {
  JWTMiddleware.verifyToken(req, res, next);
}

// Routes
router.post('/addProperty', applyJWTConditionally, addProperty);
router.get('/properties', applyJWTConditionally, getAllProperties);
router.get('/properties/:id', applyJWTConditionally, getPropertyById);
router.put('/properties/:id', applyJWTConditionally, updateProperty);
router.delete('/properties/:id', applyJWTConditionally, deleteProperty);

/**
 * Add a new property
 */
async function addProperty(req: Request, res: Response): Promise<void> {
  try {
    const result = await admin.addProperty(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error adding property', error });
  }
}

/**
 * Get all properties
 */
async function getAllProperties(req: Request, res: Response): Promise<void> {
  try {
    const result = await admin.getAllProperties();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
}


async function getPropertyById(req: Request, res: Response): Promise<void> {
  try {
    const propertyId = parseInt(req.params.id, 10);
    const result = await admin.getPropertyById(propertyId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
}


async function updateProperty(req: Request, res: Response): Promise<void> {
  try {
    const propertyId = parseInt(req.params.id, 10);
    const result = await admin.updateProperty(propertyId, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error });
  }
}


async function deleteProperty(req: Request, res: Response): Promise<void> {
  try {
    const propertyId = parseInt(req.params.id, 10);
    const result = await admin.deleteProperty(propertyId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
}

export default router;