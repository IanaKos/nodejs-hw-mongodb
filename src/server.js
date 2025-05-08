import pino from 'pino-http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';

import  errorHandler  from './middlewares/errorHandler.js';
import  notFoundHandler  from './middlewares/notFoundHandler.js';

dotenv.config();

const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;


  app.use(express.json());
 app.use(pino());
  app.use(cors());
  app.use(cookieParser());
  app.use('/auth', authRouter);
   app.use('/contacts', contactsRouter);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });
 
  app.use(notFoundHandler);

  app.use(errorHandler);

   

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
export default setupServer;