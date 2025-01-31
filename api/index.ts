import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import expressFileUpload from 'express-fileupload';

import users from './controllers/accounts';
import admin from './controllers/admin';
import properties from './controllers/properties';
import tenants from './controllers/tenant';
import payments from './controllers/Payments'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(expressFileUpload()); // Use express-fileupload before body-parser
app.use(bodyParser.json());

// Routes
app.use('/api/auth', users);
app.use('/api/properties', properties);
app.use('/api/tenants', tenants);
app.use('/api/payments', payments);
app.use('/admin', admin);

// Handle 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
