/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
// Http methods: GET, POST PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "welcome to elib apis" });
});

// user route
app.use("/api/users", userRouter);

// book route
app.use("/api/books", bookRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
