import { Request, Response } from "express";
import AuthService from "./auth.service.js";
import logger from "../../core/logger/winston.logger.js";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // const { user, token } = await AuthService.login(email, password);

    const { user } = {
      user: { id: "hjhs7889732", email: email, username: "sampleUser" },
    };

    console.log(req.cookies);
    

    res
      .status(200)
      .json(
        new ApiResponse(200, { user }, "User logged-in successfully")
      );
  }

  static async register(req: Request, res: Response) {
    console.log("User details:", req.body);
    const { email, password, username } = req.body;

    const { user, token } = await AuthService.register(
      email,
      password,
      username
    );

    res
      .status(201)
      .json(new ApiResponse(201, { user, token }, "User created successfully"));
  }

  // static async getProfile(req: Request, res: Response) {
  //   const user = await AuthService.getUserProfile(req.user?.id); // Assuming middleware sets `req.user`
  //   return res.status(200).json({ success: true, user });
  // }
}

export default AuthController;
