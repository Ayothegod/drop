import { Request, Response } from "express";
import ProfileService from "./profile.service.js";
import logger from "../../core/logger/winston.logger.js";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";
import { httpStatus } from "../../shared/utils/constants.js";

class ProfileController {
  static async update(req: Request, res: Response) {
    const { fullname, email, avatar } = req.body;

    const { msg } = await ProfileService.update(req, fullname, email, avatar);

    res
      .status(httpStatus.ok)
      .json(new ApiResponse(httpStatus.ok, null, msg));
  }

  static async changePassword(req: Request, res: Response) {
    const { currentPassword, newPassword } = req.body;

    const { msg } = await ProfileService.changePassword(
      currentPassword,
      newPassword,
      req
    );

    res.status(httpStatus.ok).json(new ApiResponse(httpStatus.ok, null, msg));
  }
}

export default ProfileController;
