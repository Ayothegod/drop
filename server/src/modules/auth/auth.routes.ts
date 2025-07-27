import { Request, Response, Router } from "express";
import AuthController from "./auth.controller.js";
import { validate } from "../../core/middlewares/validateZod.js";
import { loginSchema, registerSchema } from "./schema.js";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";
import { prisma } from "../../core/database/prisma.js";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(AuthController.login)
);
router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(AuthController.register)
);

router.get("/verify", asyncHandler(AuthController.verify));

// NOTE: example
// router.get(
//   "/verify/success",
//   asyncHandler((req: Request, res: Response) => {
//     res.status(200).json(new ApiResponse(200, "Success - Email verified successfully"));
//   })
// );

// app.post("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.send("Logged out");
//   });
// });
// router.get("/me", AuthController.getProfile);

export default router;
