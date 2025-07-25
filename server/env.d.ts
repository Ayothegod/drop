declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT: string;
    CORS_ORIGIN: string;
    DATABASE_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_APIKEY: string;
    CLOUDINARY_APISECRET: string;
  }
}
