import { v2 as cloudinary } from "cloudinary";
import parsedEnv from "./env.js";

cloudinary.config({
  cloud_name: parsedEnv.CLOUDINARY_NAME,
  api_key: parsedEnv.CLOUDINARY_APIKEY,
  api_secret: parsedEnv.CLOUDINARY_APISECRET,
});

export default cloudinary;
