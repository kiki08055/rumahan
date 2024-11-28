import express from 'express'
import environment from 'dotenv'
import kasirRouter from './routers/kasir.router'

import { ErrorHandlerMiddleware } from './middlewares/error.handler.middleware'

environment.config()

const app = express()
const errorHandler = ErrorHandlerMiddleware
const PORT = process.env.SERVER_PORT_DEV;

app.use(express.json())

app.use('/api/kasir', kasirRouter)
app.listen(PORT,() => {
    console.log(`Listening on port : ${PORT}`);
    
})