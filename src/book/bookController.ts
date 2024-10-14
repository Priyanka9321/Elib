/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import bookModel from "./bookModel";

const mimeToExtension = (mimeType: string) => {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "application/pdf":
      return "pdf";
    // Add more mappings if needed
    default:
      return ""; // Handle unknown MIME types
  }
};
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype;
    const fileName = files.coverImage[0].filename;

    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    // Get the correct extension from the MIME type
    const fileExtension = mimeToExtension(coverImageMimeType);

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: fileExtension || undefined, // Only pass format if valid
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );

    console.log("bookFileUploadResult", bookFileUploadResult);

    console.log("uploadResult", uploadResult);

    const newBook = await bookModel.create({
      title,
      genre,
      author: "67090c40d3b08de8f52acaf4",
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    // Delete temp files
    // wrap in try catch
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    console.error("Error in createBook:", error);
    res
      .status(500)
      .json({ message: "An error occurred while uploading the book cover." });
  }
};

export { createBook };
