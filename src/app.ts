import express from 'express';
import environment from 'dotenv';
import kasirRouter from './routers/kasir.router';
import transactionRouter from './routers/transaction.router';
import { ErrorHandlerMiddleware } from './middlewares/error.handler.middleware';
import authRouter from './routers/auth.router';
import mongoose from 'mongoose';

environment.config();

const app = express();
const errorHandler = new ErrorHandlerMiddleware();
const PORT = process.env.SERVER_PORT_DEV || 8000; 

// Koneksi ke MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI || 'mongodb://localhost:27017/default_database')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());
app.use('/api/kasir', kasirRouter);
app.use('/api/transaction', transactionRouter);

app.use("/api/auth", authRouter);

app.use(errorHandler.errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
