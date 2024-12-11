import express from 'express';
import environment from 'dotenv';
import kasirRouter from './routers/kasir.router';
import transactionRouter from './routers/transaction.router'
import { ErrorHandlerMiddleware } from './middlewares/error.handler.middleware';
import authRouter from './routers/auth.router'

environment.config();

const app = express();
const errorHandler = new ErrorHandlerMiddleware();
const PORT = process.env.SERVER_PORT_DEV;

app.use(express.json());
app.use('/api/kasir', kasirRouter);
app.use('/api/transaction', transactionRouter)
app.use("/api/auth", authRouter);


app.use(errorHandler.errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
