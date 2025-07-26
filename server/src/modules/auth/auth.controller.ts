import { Request, Response } from "express";
import AuthService from "./auth.service.js";
import logger from "../../core/logger/winston.logger.js";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";
import { httpStatus } from "../../shared/utils/constants.js";

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // const { user, token } = await AuthService.login(email, password);

    const { user } = {
      user: { id: "hjhs7889732", email: email, username: "sampleUser" },
    };

    res
      .status(200)
      .json(new ApiResponse(200, { user }, "User logged-in successfully"));
  }

  static async register(req: Request, res: Response) {
    const { email, password, fullname } = req.body;

    const { user, msg } = await AuthService.register(email, password, fullname);

    res
      .status(httpStatus.created)
      .json(new ApiResponse(httpStatus.created, user, msg));
  }

  static async verify(req: Request, res: Response) {
    const { token } = req.query

    const {msg} = await AuthService.verify(token)

    res
      .status(httpStatus.created)
      .json(new ApiResponse(httpStatus.created, "user", "msg"));
  }
}

export default AuthController;
