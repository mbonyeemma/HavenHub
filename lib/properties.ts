import { executeQuery } from './mysql';

export interface Property {
  id: number;
  name: string;
  district: string;
  address: string;
  type: 'residential' | 'commercial';
  hasUnits: boolean;
  rentalAmount?: number;
  rentalPeriod?: string;
}

export const getAllProperties = async (): Promise<Property[]> => {
  const query = 'SELECT * FROM properties';
  return await executeQuery(query);
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  const query = 'SELECT * FROM properties WHERE id = ?';
  const results = await executeQuery(query, [id]);
  return results[0] || null;
};

export const createProperty = async (property: Omit<Property, 'id'>): Promise<Property> => {
  const query = 'INSERT INTO properties SET ?';
  const result = await executeQuery(query, [property]);
  return { ...property, id: result.insertId };
};

export const updateProperty = async (id: string, property: Partial<Property>): Promise<Property> => {
  const query = 'UPDATE properties SET ? WHERE id = ?';
  await executeQuery(query, [property, id]);
  return getPropertyById(id) as Promise<Property>;
};

export const deleteProperty = async (id: string): Promise<void> => {
  const query = 'DELETE FROM properties WHERE id = ?';
  await executeQuery(query, [id]);
};

