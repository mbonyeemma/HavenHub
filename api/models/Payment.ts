import Model from '../helpers/model';

class Payment extends Model {
  /**
   * Add a new payment
   */
  async addPayment(data: any): Promise<any> {
    try {
      const result = await this.insertData('payments', data);
      return result;
    } catch (error) {
      console.error('Error adding payment:', error);
      throw error;
    }
  }

  /**
   * Get all payments
   */
  async getAllPayments(): Promise<any> {
    try {
      const payments = await this.selectDataQuery('payments');
      return payments;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }

  /**
   * Get a payment by ID
   */
  async getPaymentById(id: number): Promise<any> {
    try {
      const payment = await this.selectData('payments', `id=${id}`);
      return payment;
    } catch (error) {
      console.error('Error fetching payment by ID:', error);
      throw error;
    }
  }

  /**
   * Update a payment by ID
   */
  async updatePayment(id: number, data: any): Promise<any> {
    try {
      const result = await this.updateData('payments', `id=${id}`, data);
      return result;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  }

  /**
   * Delete a payment by ID
   */
  async deletePayment(id: number): Promise<any> {
    try {
      const result = await this.deleteData('payments', `id=${id}`);
      return result;
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  }
}

export default Payment;
