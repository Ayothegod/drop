import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { verifyToken } from "../../core/middlewares/auth.middleware.js";
import StoreController from "./store.controller.js";

const router = Router();

router.post(
  "/",
  // validate(updateProfileSchema),
  asyncHandler(StoreController.create)
);

router.put(
  "/",
  // validate(updateProfileSchema),
  asyncHandler(StoreController.create)
);

router.delete(
  "/",
  // validate(updateProfileSchema),
  asyncHandler(StoreController.create)
);

export default router;


// products, orders, track sales and earnings(analytics), payments
// user - profile, orders - View/download, cart + watchlist