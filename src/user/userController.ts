import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log("Request Body: ", req.body);

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // Database call
    const user = await userModel.findOne({email: email});

    if (user) {
        const error = createHttpError(400, "User already exists with this email.");
        return next(error);
    }

    // password -> hashed
    const hashedPassword = await bcrypt.hash(password, 10);
    

    // Simulating user creation
    res.status(201).json({ message: "User created" });

  } catch (error) {
    // Pass any unexpected errors to the global error handler
    next(error);
  }

};

export { createUser };
