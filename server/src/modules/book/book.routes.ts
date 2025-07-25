import { Router } from "express";
import BookController from "./book.controller.js";
import { validate } from "../../core/middlewares/validateZod.js";
import { bookSchema } from "./schema.js";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { verifyToken } from "../../core/middlewares/auth.middleware.js";

const router = Router();

// get all boooks
router.get("/", verifyToken, asyncHandler(BookController.getBooks));

router.get(
  "/recommended",
  verifyToken,
  asyncHandler(BookController.getRecommended)
);

// get book

// create book
router.post(
  "/create",
  verifyToken,
  validate(bookSchema),
  asyncHandler(BookController.create)
);

// delete book
router.delete(
  "/:id",
  verifyToken,
  validate(bookSchema),
  asyncHandler(BookController.deleteBook)
);

// update book

export default router;
