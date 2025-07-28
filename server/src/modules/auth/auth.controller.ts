import { Request, Response } from "express";
import AuthService from "./auth.service.js";
import logger from "../../core/logger/winston.logger.js";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";
import { httpStatus } from "../../shared/utils/constants.js";
import serverEnv from "../../core/config/env.js";

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { user, msg } = await AuthService.login(email, password, req);

    res
      .status(httpStatus.ok)
      .json(new ApiResponse(httpStatus.ok, { user }, msg));
  }

  static async register(req: Request, res: Response) {
    const { email, password, fullname } = req.body;

    const { user, msg } = await AuthService.register(email, password, fullname);

    res
      .status(httpStatus.created)
      .json(new ApiResponse(httpStatus.created, user, msg));
  }

  static async verify(req: Request, res: Response) {
    const { token } = req.query;

    const { success, error } = await AuthService.verify(token);
    // console.log(success, error);

    if (success) {
      res.redirect(`${serverEnv.CLIENT_URL}/auth/verified`);
    } else if (error) {
      res.redirect(`${serverEnv.CLIENT_URL}/auth/verify-failed?error=${error}`);
    }
  }

  static async verification(req: Request, res: Response) {
    const { email } = req.body;

    const { msg } = await AuthService.verification(email);

    res.status(httpStatus.ok).json(new ApiResponse(httpStatus.ok, null, msg));
  }

  static async forgetPassword(req: Request, res: Response) {
    const { email } = req.body;

    const { msg } = await AuthService.forgetPassword(email);

    res.status(httpStatus.ok).json(new ApiResponse(httpStatus.ok, null, msg));
  }

  static async resetPassword(req: Request, res: Response) {
    const { token, password } = req.body;

    const { msg } = await AuthService.resetPassword(token, password, req);

    res.status(httpStatus.ok).json(new ApiResponse(httpStatus.ok, null, msg));
  }

  static async logout(req: Request, res: Response) {
    const { msg } = await AuthService.logout(req);

    res.status(httpStatus.ok).json(new ApiResponse(httpStatus.ok, null, msg));
  }
}

export default AuthController;
