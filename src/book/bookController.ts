/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import path from "node:path";
import cloudinary from "../config/cloudinary";

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
    console.log("files", req.files);

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

    const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
       resource_type: 'raw',
       filename_override: bookFileName,
       folder: 'book-pdfs',
       format: 'pdf'
    });

    console.log("bookFileUploadResult", bookFileUploadResult);

    console.log("uploadResult", uploadResult);

    res.json({ uploadResult });
  } catch (error) {
    console.error("Error in createBook:", error);
    res
      .status(500)
      .json({ message: "An error occurred while uploading the book cover." });
  }
};

export { createBook };
