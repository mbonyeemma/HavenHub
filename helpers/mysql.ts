import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Generic insert function
export async function insert(table: string, data: Record<string, any>): Promise<any> {
  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

  try {
    const [result] = await pool.execute(query, values);
    return result;
  } catch (error) {
    console.error('Error in insert operation:', error);
    throw error;
  }
}

// Generic select function
export async function select(table: string, columns: string[] = ['*'], where: Record<string, any> = {}): Promise<any> {
  const selectedColumns = columns.join(', ');
  let query = `SELECT ${selectedColumns} FROM ${table}`;
  const values: any[] = [];

  if (Object.keys(where).length > 0) {
    const whereConditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
    query += ` WHERE ${whereConditions}`;
    values.push(...Object.values(where));
  }

  try {
    const [rows] = await pool.execute(query, values);
    return rows;
  } catch (error) {
    console.error('Error in select operation:', error);
    throw error;
  }
}

// Generic update function
export async function update(table: string, where: Record<string, any>, data: Record<string, any>): Promise<any> {
  const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const whereConditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
  const values = [...Object.values(data), ...Object.values(where)];

  const query = `UPDATE ${table} SET ${setClause} WHERE ${whereConditions}`;

  try {
    const [result] = await pool.execute(query, values);
    return result;
  } catch (error) {
    console.error('Error in update operation:', error);
    throw error;
  }
}

// Generic delete function
export async function remove(table: string, where: Record<string, any>): Promise<any> {
  const whereConditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
  const values = Object.values(where);

  const query = `DELETE FROM ${table} WHERE ${whereConditions}`;

  try {
    const [result] = await pool.execute(query, values);
    return result;
  } catch (error) {
    console.error('Error in delete operation:', error);
    throw error;
  }
}

// Function to execute custom queries
export async function executeQuery(query: string, values: any[] = []): Promise<any> {
  try {
    const [result] = await pool.execute(query, values);
    return result;
  } catch (error) {
    console.error('Error executing custom query:', error);
    throw error;
  }
}

