import cloudinary from "../../core/config/cloudinary.js";
import AuthRepository from "./book.repository.js";
import parsedEnv from "../../core/config/env.js";
import { ApiError } from "../../core/errors/ApiError.js";
import BookRepository from "./book.repository.js";
import { Request } from "express";

class BookService {
  static async createBook(
    title: string,
    caption: string,
    rating: number,
    image: string,
    req: Request
  ) {
    // upload image to cloudinary
    const uploadResult = await cloudinary.uploader
      .upload(image, {
        upload_preset: "unsigned_upload",
        public_id: `${title}-image`,
        allowed_formats: ["png", "jpg", "svg", "ico", "jfif", "webp", "jpeg"],
      })
      .catch((error) => {
        console.log(error);
        throw new ApiError(400, "Failed to upload book image");
      });

    const imageUrl = uploadResult.secure_url;

    // save book to db
    const book = await BookRepository.createBook({
      title,
      caption,
      rating,
      image: imageUrl,
      user: {
        connect: { id: req.user?.id as string },
      },
    });

    // return null;
    return { book };
  }

  static async getBook() {
    const book = "book";
    return { book };
  }

  static async getBooks(limit: number, skip: number) {
    const books = await BookRepository.findBooks({
      orderBy: { createdAt: "desc" },
      include: { user: true },
      skip,
      take: limit,
    });

    const allBooks = await BookRepository.findBooks({});

    return { books, totalBooks: allBooks.length };
  }

  static async deleteBook(id: string, req: Request) {
    // check for book
    const book = await BookRepository.findUniqueBook({ id }, true);
    if (!book) throw new ApiError(404, "Book not found");

    // chcek if user is the creator of the book
    if (book.user.id !== req.user?.id) throw new ApiError(404, "Unauthorized.");

    // delete book image
    if (book.image && book.image.includes("cloudinary")) {
      const publicId = book.image.split("/").pop()?.split(".")[0] as string;

      await cloudinary.uploader.destroy(publicId).catch((error) => {
        console.log(error);
        throw new ApiError(400, "Failed to delete book's image");
      });
    }

    await BookRepository.deleteBook({ where: { id } });

    return;
  }

  static async recommendedBooks(req: Request) {
    const recommended = await BookRepository.findBooks({
      orderBy: { createdAt: "desc" },
      where: { id: req.user?.id as string },
    });

    return { recommended };
  }

  static async updateBook(
    id: string,
    title: string,
    caption: string,
    rating: number,
    image: string,
    req: Request
  ) {
    // check for book
    const book = await BookRepository.findUniqueBook({ id }, true);
    if (!book) throw new ApiError(404, "Book not found");

    // check if user is the creator of the book
    if (book.user.id !== req.user?.id) throw new ApiError(404, "Unauthorized.");

    // update book for user
    await BookRepository.updateBook({
      where: { id },
      data: {
        title,
        caption,
        rating,
        image,
        user: {
          connect: { id: req.user?.id as string },
        },
      },
    });

    return;
  }
}

export default BookService;
