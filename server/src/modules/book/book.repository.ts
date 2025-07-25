import { prisma } from "../../core/database/prisma.js";
import { Prisma, Book } from "@prisma/client";

class BookRepository {
  static async findBook(filter: Partial<Book>): Promise<Book | null> {
    return await prisma.book.findFirst({ where: filter });
  }

  static async findUniqueBook(
    filter: Prisma.BookWhereUniqueInput,
    check: boolean
  ) {
    return prisma.book.findUnique({ where: filter, include: { user: check } });
  }

  static async findBooks(filter: Prisma.BookFindManyArgs): Promise<Book[]> {
    return await prisma.book.findMany({});
  }

  static async createBook(bookData: Prisma.BookCreateInput) {
    return await prisma.book.create({ data: bookData });
  }

  static async deleteBook(bookData: Prisma.BookDeleteArgs) {
    return await prisma.book.delete(bookData);
  }

  static async updateBook(bookData: Prisma.BookUpdateArgs) {
    // check for book
    // const book = await prisma.book.findUnique({
    //   where: { id: bookData.where.id },
    //   include: { user: true },
    // });
    // return await prisma.book.update({where:{id: bookData.id}, data: bookData.data});
  }
}

export default BookRepository;
