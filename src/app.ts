/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import { config } from "./config/config";
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './user/userRouter';

const app = express();

// Routes
// Http methods: GET, POST PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "welcome to elib apis" });
});


app.use('/api/users',userRouter);


// Global error handler
app.use(globalErrorHandler);

export default app;
