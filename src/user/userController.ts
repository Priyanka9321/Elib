import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    console.log("Request Body: ", req.body);

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // Simulating user creation
    res.status(201).json({ message: "User created" });

  } catch (error) {
    // Pass any unexpected errors to the global error handler
    next(error);
  }

};

export { createUser };
