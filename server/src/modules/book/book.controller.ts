import { Request, Response } from "express";
import AuthService from "./book.service.js";
import logger from "../../core/logger/winston.logger.js";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";
import BookService from "./book.service.js";

class BookController {
  static async create(req: Request, res: Response) {
    const { title, caption, rating, image } = req.body;

    const { book } = await BookService.createBook(
      title,
      caption,
      rating,
      image,
      req
    );

    res
      .status(200)
      .json(new ApiResponse(200, book, "book created successfully"));
  }

  static async getBooks(req: Request, res: Response) {
    const page: number = JSON.parse(req.params.page) || 1;
    const limit: number = JSON.parse(req.params.skip) || 5;
    const skip = (page - 1) * limit;

    const { books, totalBooks } = await BookService.getBooks(limit, skip);

    // console.log(books);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          books,
          currentPage: page,
          totalBooks,
          totalPages: Math.ceil(totalBooks / limit),
        },
        "books retrieved successfully"
      )
    );
  }

  static async deleteBook(req: Request, res: Response) {
    const { id } = req.params;

    await BookService.deleteBook(id, req);

    res
      .status(200)
      .json(new ApiResponse(200, null, "books deleted successfully"));
  }


  static async getRecommended(req: Request, res: Response) {
    const { recommended } = await BookService.recommendedBooks(req);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          recommended,
          "recommended books retrieved successfully"
        )
      );
  }
}

export default BookController;
