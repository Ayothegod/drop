import rateLimit from "express-rate-limit";

// const limiter = rateLimit({
//   store: new RedisStore({
//     sendCommand: (...args: string[]) => redisClient.call(...args),
//   }),
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests, try again later.",
// });

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 50, // limit each IP to 100 requests per window
  message: "Too many requests, try again later.",
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please wait.",
});


const verificationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1,
  message: "Too many attempts, please wait.",
});
