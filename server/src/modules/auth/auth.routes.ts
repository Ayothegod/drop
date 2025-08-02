import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { validate } from "../../core/middlewares/validateZod.js";
import AuthController from "./auth.controller.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./schema.js";

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

router.post(
  "/verification",
  validate(emailSchema),
  asyncHandler(AuthController.verification)
);

router.post(
  "/forget-password",
  validate(emailSchema),
  asyncHandler(AuthController.forgetPassword)
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  asyncHandler(AuthController.resetPassword)
);

router.delete("/logout", asyncHandler(AuthController.logout));

router.delete("/delete/:email", asyncHandler(AuthController.delete));


export default router;
