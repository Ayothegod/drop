import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { verifyToken } from "../../core/middlewares/auth.middleware.js";
import StoreController from "./store.controller.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  // validate(updateProfileSchema),
  asyncHandler(StoreController.create)
);

export default router;
