// import { prisma } from "../core/database/prisma.js";

// export async function sessionUserLinker(req, res, next) {
//   // Only run if user is logged in and session has an ID
//   if (req.session && req.session.userId && req.session.id) {
//     // Try to find the session record
//     const sessionRecord = await prisma.session.findUnique({
//       where: { sid: req.session.id },
//     });

//     // If session exists and userId is missing, update it
//     if (sessionRecord && !sessionRecord.userId) {
//       await prisma.session.update({
//         where: { sid: req.session.id },
//         data: { userId: req.session.userId },
//       });
//     }
//   }
//   next();
// }

// import { sessionUserLinker } from "./middlewares/sessionUserLinker.js";
// app.use(sessionUserLinker);