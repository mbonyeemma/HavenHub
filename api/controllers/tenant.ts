import express, { Request, Response, NextFunction } from 'express';
import { JWTMiddleware } from '../helpers/jwt.middleware';
import Tenant from '../models/Tenant';

const router = express.Router();
const admin = new Tenant();

// Middleware to apply JWT conditionally
function applyJWTConditionally(req: Request, res: Response, next: NextFunction): void {
  JWTMiddleware.verifyToken(req, res, next);
}

// Routes
router.post('/tenants', applyJWTConditionally, addTenant);
router.get('/tenants', applyJWTConditionally, getAllTenants);
router.get('/tenants/:id', applyJWTConditionally, getTenantById);
router.put('/tenants/:id', applyJWTConditionally, updateTenant);
router.delete('/tenants/:id', applyJWTConditionally, deleteTenant);

/**
 * Add a new tenant
 */
async function addTenant(req: Request, res: Response): Promise<void> {
  try {
    const result = await admin.insertData('tenants', req.body);
    res.status(201).json({ message: 'Tenant added successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding tenant', error });
  }
}

/**
 * Get all tenants
 */
async function getAllTenants(req: Request, res: Response): Promise<void> {
  try {
    const tenants = await admin.selectDataQuery('tenants');
    res.status(200).json({ message: 'Tenants fetched successfully', data: tenants });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenants', error });
  }
}

/**
 * Get a tenant by ID
 */
async function getTenantById(req: Request, res: Response): Promise<void> {
  try {
    const tenantId = parseInt(req.params.id, 10);
    const tenant = await admin.selectDataById('tenants', tenantId);

    if (!tenant) {
      res.status(404).json({ message: 'Tenant not found' });
      return;
    }

    res.status(200).json({ message: 'Tenant fetched successfully', data: tenant });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenant', error });
  }
}

/**
 * Update a tenant by ID
 */
async function updateTenant(req: Request, res: Response): Promise<void> {
  try {
    const tenantId = parseInt(req.params.id, 10);
    const result = await admin.updateData('tenants', tenantId, req.body);

    if (!result) {
      res.status(404).json({ message: 'Tenant not found' });
      return;
    }

    res.status(200).json({ message: 'Tenant updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tenant', error });
  }
}

/**
 * Delete a tenant by ID
 */
async function deleteTenant(req: Request, res: Response): Promise<void> {
  try {
    const tenantId = parseInt(req.params.id, 10);
    const result = await admin.deleteData('tenants', tenantId);

    if (!result) {
      res.status(404).json({ message: 'Tenant not found' });
      return;
    }

    res.status(200).json({ message: 'Tenant deleted successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tenant', error });
  }
}

export default router;