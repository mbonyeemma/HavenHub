import { executeQuery } from './mysql';

export interface Payment {
  id: number;
  tenantId: number;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export const getAllPayments = async (): Promise<Payment[]> => {
  const query = 'SELECT * FROM payments';
  return await executeQuery(query);
};

export const getPaymentById = async (id: string): Promise<Payment | null> => {
  const query = 'SELECT * FROM payments WHERE id = ?';
  const results = await executeQuery(query, [id]);
  return results[0] || null;
};

export const createPayment = async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
  const query = 'INSERT INTO payments SET ?';
  const result = await executeQuery(query, [payment]);
  return { ...payment, id: result.insertId };
};

export const updatePayment = async (id: string, payment: Partial<Payment>): Promise<Payment> => {
  const query = 'UPDATE payments SET ? WHERE id = ?';
  await executeQuery(query, [payment, id]);
  return getPaymentById(id) as Promise<Payment>;
};

export const deletePayment = async (id: string): Promise<void> => {
  const query = 'DELETE FROM payments WHERE id = ?';
  await executeQuery(query, [id]);
};

