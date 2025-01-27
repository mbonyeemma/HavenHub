import Model from "../helpers/model";

class Property extends Model {
  async addProperty(data: any) {
    try {
      const newProperty = {
        name: data.name,
        district: data.district,
        address: data.address,
        type: data.type,
        has_units: data.hasUnits || 0,
        rental_amount: data.rentalAmount || null,
        rental_period: data.rentalPeriod || null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const insertedPropertyId = await this.insertData("properties", newProperty);

      return this.makeResponse(201, "Property added successfully", { propertyId: insertedPropertyId });
    } catch (error) {
      console.error("Error in addProperty:", error);
      return this.makeResponse(500, "Error adding property");
    }
  }

  async addUnit(data: any) {
    try {
      const newUnit = {
        name: data.name,
        property_id: data.property_id,
        price: data.price,
        period: data.period,
      };

      const insertedPropertyId = await this.insertData("units", newUnit);

      return this.makeResponse(201, "Property added successfully", { propertyId: insertedPropertyId });
    } catch (error) {
      console.error("Error in addProperty:", error);
      return this.makeResponse(500, "Error adding property");
    }
  }

  async getAllProperties() {
    try {
      const properties = await this.selectDataQuery("properties");
      return this.makeResponse(200, "Properties fetched successfully", properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      return this.makeResponse(500, "Error fetching properties");
    }
  }

  async getUnitsByPropertyId(id: string) {
    try {
      const property = await this.selectDataQuery("units", `property_id='${id}'`);
      if (!property) {
        return this.makeResponse(404, "Property not found");
      }
      return this.makeResponse(200, "Property fetched successfully", property);
    } catch (error) {
      console.error("Error fetching property by ID:", error);
      return this.makeResponse(500, "Error fetching property");
    }
  }


  async getPropertyById(id: string) {
    try {
      const property = await this.selectDataQuery("properties", `id='${id}'`);
      if (!property) {
        return this.makeResponse(404, "Property not found");
      }
      return this.makeResponse(200, "Property fetched successfully", property);
    } catch (error) {
      console.error("Error fetching property by ID:", error);
      return this.makeResponse(500, "Error fetching property");
    }
  }

  async updateProperty(id: number, data: any) {
    try {
      const updatedFields = {
        ...data,
        updated_at: new Date(),
      };

      const updateResult = await this.updateData("properties", `id='${id}'`, updatedFields);

      if (!updateResult) {
        return this.makeResponse(404, "Property not found");
      }

      return this.makeResponse(200, "Property updated successfully", updateResult);
    } catch (error) {
      console.error("Error updating property:", error);
      return this.makeResponse(500, "Error updating property");
    }
  }

  async deleteProperty(id: number) {
    try {
      const deleteResult = await this.deleteData("properties", `id='${id}'`);

      if (!deleteResult) {
        return this.makeResponse(404, "Property not found");
      }

      return this.makeResponse(200, "Property deleted successfully", deleteResult);
    } catch (error) {
      console.error("Error deleting property:", error);
      return this.makeResponse(500, "Error deleting property");
    }
  }

  async deleteUnit(id: number) {
    try {
      const deleteResult = await this.deleteData("units", `id='${id}'`);

      if (!deleteResult) {
        return this.makeResponse(404, "unit not found");
      }

      return this.makeResponse(200, "unit deleted successfully", deleteResult);
    } catch (error) {
      console.error("Error deleting unit:", error);
      return this.makeResponse(500, "Error deleting unit");
    }
  }
}

export default Property;
