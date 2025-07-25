import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./core/middlewares/error.middleware.js";
import { asyncHandler } from "./core/middlewares/asyncHandler.js";
import { ApiResponse } from "./core/middlewares/ApiResponse.js";
import authRoutes from "./modules/auth/auth.routes.js";
import cors from "cors";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import serverEnv from "./core/config/serverEnv.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(session({
  secret: serverEnv.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// TODO: job.start()
app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));
// { limit: "16kb" }

app.get(
  "/api/v1/test",
  asyncHandler(async (req: Request, res: Response) => {
    return res
      .status(200)
      .json(new ApiResponse(200, "OK", "/ route working successfully"));
  })
);

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler as any);

export default app;
