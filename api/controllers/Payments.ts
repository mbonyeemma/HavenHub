import express, { Request, Response, NextFunction } from 'express';
import Admin from '../models/Payment';
import { JWTMiddleware } from '../helpers/jwt.middleware';

const router = express.Router();
const admin = new Admin();

// Middleware to apply JWT conditionally
function applyJWTConditionally(req: Request, res: Response, next: NextFunction): void {
  JWTMiddleware.verifyToken(req, res, next);
}

// Routes
router.post('/payments', applyJWTConditionally, addPayment);
router.get('/payments', applyJWTConditionally, getAllPayments);
router.get('/payments/:id', applyJWTConditionally, getPaymentById);
router.put('/payments/:id', applyJWTConditionally, updatePayment);
router.delete('/payments/:id', applyJWTConditionally, deletePayment);

/**
 * Add a new payment
 */
async function addPayment(req: Request, res: Response): Promise<void> {
  try {
    const result = await admin.insertData('payments', req.body);
    res.status(201).json({ message: 'Payment added successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding payment', error });
  }
}

/**
 * Get all payments
 */
async function getAllPayments(req: Request, res: Response): Promise<void> {
  try {
    const payments = await admin.selectDataQuery('payments');
    res.status(200).json({ message: 'Payments fetched successfully', data: payments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
}

/**
 * Get a payment by ID
 */
async function getPaymentById(req: Request, res: Response): Promise<void> {
  try {
    const paymentId = parseInt(req.params.id, 10);
    const payment = await admin.selectDataById('payments', paymentId);

    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    res.status(200).json({ message: 'Payment fetched successfully', data: payment });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error });
  }
}

/**
 * Update a payment by ID
 */
async function updatePayment(req: Request, res: Response): Promise<void> {
  try {
    const paymentId = parseInt(req.params.id, 10);
    const result = await admin.updateData('payments', paymentId, req.body);

    if (!result) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    res.status(200).json({ message: 'Payment updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error });
  }
}

/**
 * Delete a payment by ID
 */
async function deletePayment(req: Request, res: Response): Promise<void> {
  try {
    const paymentId = parseInt(req.params.id, 10);
    const result = await admin.deleteData('payments', paymentId);

    if (!result) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    res.status(200).json({ message: 'Payment deleted successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error });
  }
}

export default router;
