/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    res.json({ });
};

export { createBook };
