import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { validate } from "../../core/middlewares/validateZod.js";
import ProfileController from "./profile.controller.js";
import {
  changePasswordSchema,
  profileSchema,
  updateProfileSchema,
} from "./schema.js";
import { verifyToken } from "../../core/middlewares/auth.middleware.js";

const router = Router();

// get profile
// router.get(
//   "/:email",
//   validate(updateProfileSchema),
//   asyncHandler(ProfileController.update)
// );

router.put(
  "/",
  validate(updateProfileSchema),
  asyncHandler(ProfileController.update)
);

router.patch(
  "/change-password",
  validate(changePasswordSchema),
  asyncHandler(ProfileController.changePassword)
);

export default router;
