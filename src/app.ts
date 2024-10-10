import express from "express";

const app = express();

// Routes
// Http methods: GET, POST PUT, PATCH, DELETE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/", (req, res, _next) => {
  res.json({ message: "welcome to elib apis" });
});

export default app;
