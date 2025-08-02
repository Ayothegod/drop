import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import session from "express-session";
import serverEnv from "./core/config/env.js";
import { prisma } from "./core/database/prisma.js";
import { ApiResponse } from "./core/middlewares/ApiResponse.js";
import { asyncHandler } from "./core/middlewares/asyncHandler.js";
import { errorHandler } from "./core/middlewares/error.middleware.js";
import { sessionUserLinker } from "./core/middlewares/sessionLinker.middlware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { authLimiter, limiter } from "./core/middlewares/rateLimit.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    secret: serverEnv.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: false,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// TODO: job.start()
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));

// { limit: "16kb" }
app.use(limiter)
app.use(sessionUserLinker);

app.get(
  "/api/v1/test",
  asyncHandler(async (req: Request, res: Response) => {

    console.log(req.session);
    

    return res
      .status(200)
      .json(new ApiResponse(200, "OK", "/ route working successfully"));
  })
);

app.use("/api/v1/auth", authLimiter, authRoutes);

app.use(errorHandler as any);

export default app;
