// import { Request, Response } from "express";
// import ProfileService from "./profile.service.js";
// import logger from "../../core/logger/winston.logger.js";
// import { ApiResponse } from "../../core/middlewares/ApiResponse.js";

// class ProfileController {
//   static async create(req: Request, res: Response) {
//     const { username, bio, experience, userCategoryPreference } = req.body;

//     const { profile, msg } = await ProfileService.create(
//       username,
//       userCategoryPreference,
//       req,
//       bio,
//       experience
//     );

//     res.status(201).json(new ApiResponse(201, { profile }, msg));
//   }

//   static async update(req: Request, res: Response) {
//     const { username, bio, experience, userCategoryPreference } = req.body;

//     const { profile, msg } = await ProfileService.update(
//       username,
//       userCategoryPreference,
//       req,
//       bio,
//       experience
//     );

//     res.status(200).json(new ApiResponse(200, { profile }, msg));
//   }
// }

// export default ProfileController;
