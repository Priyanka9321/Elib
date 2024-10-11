/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import { config } from "./config/config";
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

// Routes
// Http methods: GET, POST PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "welcome to elib apis" });
});

// Global error handler
app.use(globalErrorHandler);

export default app;
