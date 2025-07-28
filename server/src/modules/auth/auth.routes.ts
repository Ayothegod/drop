import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { validate } from "../../core/middlewares/validateZod.js";
import AuthController from "./auth.controller.js";
import { emailSchema, loginSchema, registerSchema } from "./schema.js";

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
