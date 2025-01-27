import * as mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

class DbHelper {
  private normalPool: any;
  private writePool: any;
  private readPool: any;
  constructor() {
    this.normalPool = this.initializePool('normal');
  }
  public initializePool(connectionType: string) {
    if (connectionType === 'normal') {
      console.log({
        connectionLimit: 1,
        host: process.env.HOST_NAME,
        database: process.env.DBNAME,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
      })
      return mysql.createPool({
        connectionLimit: 1,
        host: process.env.HOST_NAME,
        database: process.env.DBNAME,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
      });
    }
    if (connectionType === 'write') {
      return mysql.createPool({
        connectionLimit: 1,
        host: process.env.WRITE_NAME,
        database: process.env.WRITE_DBNAME,
        user: process.env.WRITE_USER_NAME,
        password: process.env.WRITE_PASSWORD,
      });
    }
    if (connectionType === 'read') {
      return mysql.createPool({
        connectionLimit: 1,
        host: process.env.READ_HOST_NAME,
        database: process.env.READ_DBNAME,
        user: process.env.READ_USER_NAME,
        password: process.env.READ_PASSWORD,
      });
    }
  }
  public pdoOld(query: any, conType: string = 'normal') {
    let pdoConnect: any;

    if (conType === 'read') {
      this.readOpreation();
      pdoConnect = this.readPool;
    } else if (conType === 'write') {
      this.writeOpreation();
      pdoConnect = this.writePool;
    } else {
      pdoConnect = this.normalPool;
    }

    return new Promise((resolve, reject) => {
      pdoConnect.getConnection((err: any, connection: any) => {
        if (err) {
          return reject(err);
        }

        connection.query(query, (error: any, results: any) => {
          connection.release();

          if (error) {
            return reject(error);
          }
          let data: any;
          const isProcedureCall = query.trim().startsWith('CALL');
          if (isProcedureCall) {
            data = results.length > 0 ? JSON.parse(JSON.stringify(results[0])) : [];
          } else {
            data = results.length > 0 ? JSON.parse(JSON.stringify(results)) : [];
          }
          resolve(data);
        });
      });
    });
  }


  public pdo(query: string, values: any[] = [], conType: string = 'normal') {
    let pdoConnect: any;
  
    if (conType === 'read') {
      this.readOpreation();
      pdoConnect = this.readPool;
    } else if (conType === 'write') {
      this.writeOpreation();
      pdoConnect = this.writePool;
    } else {
      pdoConnect = this.normalPool;
    }
  
    return new Promise((resolve, reject) => {
      pdoConnect.getConnection((err: any, connection: any) => {
        if (err) {
          return reject(err);
        }
  
        connection.query(query, values, (error: any, results: any) => {
          connection.release();
  
          if (error) {
            return reject(error);
          }
          let data: any;
          const isProcedureCall = query.trim().startsWith('CALL');
          if (isProcedureCall) {
            data = results.length > 0 ? JSON.parse(JSON.stringify(results[0])) : [];
          } else {
            data = results.length > 0 ? JSON.parse(JSON.stringify(results)) : [];
          }
          resolve(data);
        });
      });
    });
  }
  
  public beginTransaction() {
    return this.pdo('START TRANSACTION');
  }
  
  public commit() {
    return this.pdo('COMMIT');
  }
  
  public rollback() {
    return this.pdo('ROLLBACK');
  }

  

  public readOpreation() {
    this.readPool = this.initializePool('read');
  }
  public writeOpreation() {
    this.writePool = this.initializePool('read');
  }



}
export default new DbHelper();
