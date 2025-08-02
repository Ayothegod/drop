import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { validate } from "../../core/middlewares/validateZod.js";
import ProfileController from "./profile.controller.js";
import { profileSchema, updateProfileSchema } from "./schema.js";
import { verifyToken } from "../../core/middlewares/auth.middleware.js";

const router = Router();

// router.post('/', verifyToken, validate(profileSchema), asyncHandler(ProfileController.create))

// get profile
router.get('/:email', validate(updateProfileSchema), asyncHandler(ProfileController.update))

router.put('/', verifyToken, validate(updateProfileSchema), asyncHandler(ProfileController.update))



export default router;
