import { prisma } from "../database/prisma";
import { NextFunction, Request, Response } from "express";

export async function sessionUserLinker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session && req.session.userId && req.session.id) {

    const sessionRecord = await prisma.session.findUnique({
      where: { sid: req.session.id },
    });

    if (sessionRecord && !sessionRecord.userId) {
      await prisma.session.update({
        where: { sid: req.session.id },
        data: { userId: req.session.userId },
      });
    }
  }
  next();
}
