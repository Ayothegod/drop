import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { storeSchema, updateStoreSchema } from "./schema.js";
import { validate } from "../../core/middlewares/validateZod.js";
import ProductController from "./product.controller.js";

const router = Router();

router.post("/", validate(storeSchema), asyncHandler(ProductController.create));

// router.put(
//   "/",
//   validate(updateStoreSchema),
//   asyncHandler(StoreController.update)
// );

// router.delete("/", asyncHandler(StoreController.delete));

export default router;

// orders, track sales and earnings(analytics), payments
// user - profile, orders - View/download, cart + watchlist
