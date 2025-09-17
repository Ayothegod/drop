// import multerS3 from 'multer-s3';

import { S3 } from "./s3";

// import AWS from 'aws-sdk';
// const multerUpload = multer({
//   storage: multerS3({
//     s3,
//     bucket: 'your-bucket',
//     key: (req, file, cb) => cb(null, file.originalname),
//   }),
// });



// export const multerUpload = multer({
  // dest: "./src/uploads/",
  // limits: { fileSize: 10 * 1024 * 1024 },
  // storage: multer.diskStorage({
  //   destination: (req, file, cb) => {
      // cb(null, "uploads/");
  //   },
  //   filename: (req, file, cb) => {
  //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //     cb(null, uniqueSuffix + "-" + file.originalname);
  //   },
  // }),
  // fileFilter: (req, file, cb) => {
  //   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  //   if (allowedTypes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
  //   }
  // }
// });

