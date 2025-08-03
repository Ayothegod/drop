import { Request, Response } from "express";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";
import { httpStatus } from "../../shared/utils/constants.js";
import StoreService from "./product.service.js";

class ProductController {
  static async create(req: Request, res: Response) {
    const { name, bio, logo } = req.body;

    const { userStore: store, msg } = await StoreService.create(
      req,
      name,
      bio,
      logo
    );

    res
      .status(httpStatus.created)
      .json(new ApiResponse(httpStatus.created, store, msg));
  }

  static async update(req: Request, res: Response) {
    const { name, bio, logo } = req.body;
    const { msg } = await StoreService.update(req, name, bio, logo);

    res.status(httpStatus.ok).json(new ApiResponse(httpStatus.ok, null, msg));
  }

  static async delete(req: Request, res: Response) {
    const { msg } = await StoreService.delete(req);

    res.status(httpStatus.ok).json(new ApiResponse(httpStatus.ok, null, msg));
  }
}

export default ProductController;
