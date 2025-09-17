import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import serverEnv from "./env";

export const S3 = new S3Client({
  endpoint: serverEnv.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: serverEnv.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: serverEnv.CLOUDFLARE_SECRET_KEY,
  },
  region: "auto",
});

export const test = async () => {
  const command = new PutObjectCommand({
    Bucket: "drop-bucket",
    Key: "folder/filename.ext",
    Body: "Hello, world!",
    // ContentType: "your-mime-type",
  });

  console.log("first");
  await S3.send(command)
    .then((data) => {
      console.log("Success", data);
    })
    .catch((err) => {
      console.error("Error", err);
    });
};

// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// [
//   {
//     "AllowedOrigins": ["http://localhost:3000"],
//     "AllowedMethods": ["GET", "PUT", "POST"],
//     "AllowedHeaders": ["*"],
//     "ExposeHeaders": ["ETag"],
//     "MaxAgeSeconds": 3000
//   }
// ]