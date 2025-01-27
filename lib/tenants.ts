import { executeQuery } from './mysql';

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  propertyId: number;
  unitNumber?: string;
}

export const getAllTenants = async (): Promise<Tenant[]> => {
  const query = 'SELECT * FROM tenants';
  return await executeQuery(query);
};

export const getTenantById = async (id: string): Promise<Tenant | null> => {
  const query = 'SELECT * FROM tenants WHERE id = ?';
  const results = await executeQuery(query, [id]);
  return results[0] || null;
};

export const createTenant = async (tenant: Omit<Tenant, 'id'>): Promise<Tenant> => {
  const query = 'INSERT INTO tenants SET ?';
  const result = await executeQuery(query, [tenant]);
  return { ...tenant, id: result.insertId };
};

export const updateTenant = async (id: string, tenant: Partial<Tenant>): Promise<Tenant> => {
  const query = 'UPDATE tenants SET ? WHERE id = ?';
  await executeQuery(query, [tenant, id]);
  return getTenantById(id) as Promise<Tenant>;
};

export const deleteTenant = async (id: string): Promise<void> => {
  const query = 'DELETE FROM tenants WHERE id = ?';
  await executeQuery(query, [id]);
};

