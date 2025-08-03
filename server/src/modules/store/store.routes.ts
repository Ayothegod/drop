import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { validate } from "../../core/middlewares/validateZod.js";
import { storeSchema, updateStoreSchema } from "./schema.js";
import StoreController from "./store.controller.js";

const router = Router();

router.post("/", validate(storeSchema), asyncHandler(StoreController.create));

router.put(
  "/",
  validate(updateStoreSchema),
  asyncHandler(StoreController.update)
);

router.delete("/", asyncHandler(StoreController.delete));

export default router;

