import { Request, Response } from "express";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";
import { httpStatus } from "../../shared/utils/constants.js";
import StoreService from "./store.service.js";

class StoreController {
  static async create(req: Request, res: Response) {
    const { fullname, email, avatar } = req.body;

    const { msg } = await StoreService.create(req);

    res
      .status(httpStatus.ok)
      .json(new ApiResponse(httpStatus.ok, null, msg));
  }
}

export default StoreController;
