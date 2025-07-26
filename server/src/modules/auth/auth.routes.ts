import { Router } from "express";
import AuthController from "./auth.controller.js";
import { validate } from "../../core/middlewares/validateZod.js";
import { loginSchema, registerSchema } from "./schema.js";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";

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

// app.post("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.send("Logged out");
//   });
// });
// router.get("/me", AuthController.getProfile);

export default router;
