// import cron from "cron";
// import https from "https";
// import serverEnv from "./env.js";

// const job = new cron.CronJob("*/1 * * * *", () => {
//   https
//     .get(serverEnv.API_URL, (res) => {
//       if (res.statusCode === 200) console.log("GET request sent successfully");
//       else console.log("GET request failes", res.statusCode);
//     })
//     .on("connect", (e) => console.log("Connected", e))
//     .on("error", (e) => console.error("Error while sending request", e))

// });


// export default job