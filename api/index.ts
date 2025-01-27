import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import expressFileUpload from 'express-fileupload';

import users from './controllers/accounts'; 
import admin from './controllers/admin'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005; // Default to 3000 if PORT is not in environment

app.use(cors());
app.use(expressFileUpload()); // Use express-fileupload before body-parser
app.use(bodyParser.json());


// Using the routes
app.use('/users', users);
app.use('/admin', admin);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
