import Model from '../helpers/model';

class Tenant extends Model {
  /**
   * Add a new tenant
   */
  async addTenant(data: any): Promise<any> {
    try {
      const result = await this.insertData('tenants', data);
      return result;
    } catch (error) {
      console.error('Error adding tenant:', error);
      throw error;
    }
  }

  /**
   * Get all tenants
   */
  async getAllTenants(): Promise<any> {
    try {
      const tenants = await this.selectDataQuery('tenants');
      return tenants;
    } catch (error) {
      console.error('Error fetching tenants:', error);
      throw error;
    }
  }

  /**
   * Get a tenant by ID
   */
  async getTenantById(id: number): Promise<any> {
    try {
      const tenant = await this.selectDataById('tenants', id);
      return tenant;
    } catch (error) {
      console.error('Error fetching tenant by ID:', error);
      throw error;
    }
  }

  /**
   * Update a tenant by ID
   */
  async updateTenant(id: number, data: any): Promise<any> {
    try {
      const result = await this.updateData('tenants', id, data);
      return result;
    } catch (error) {
      console.error('Error updating tenant:', error);
      throw error;
    }
  }

  /**
   * Delete a tenant by ID
   */
  async deleteTenant(id: number): Promise<any> {
    try {
      const result = await this.deleteData('tenants', id);
      return result;
    } catch (error) {
      console.error('Error deleting tenant:', error);
      throw error;
    }
  }
}

export default Tenant;