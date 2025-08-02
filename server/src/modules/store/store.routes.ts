import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { verifyToken } from "../../core/middlewares/auth.middleware.js";
import StoreController from "./store.controller.js";
import { storeSchema, updateStoreSchema } from "./schema.js";
import { validate } from "../../core/middlewares/validateZod.js";

const router = Router();

router.post("/", validate(storeSchema), asyncHandler(StoreController.create));

router.put(
  "/",
  validate(updateStoreSchema),
  asyncHandler(StoreController.update)
);

router.delete("/", asyncHandler(StoreController.delete));

export default router;

// products, orders, track sales and earnings(analytics), payments
// user - profile, orders - View/download, cart + watchlist
