// import sgMail from "@sendgrid/mail";
// import serverEnv from "./serverEnv";

// export const sendEmail = (msg: any) =>
//   sgMail.send({
//     // from: "you@gmail.com",
//     ...msg,
//   });

// import sgMail from "@sendgrid/mail";
// sgMail.setApiKey(serverEnv.SENDGRID_API_KEY);

// const msg = {
//   to: `ayodasilva12@gmail.com`,
//   from: "heyayomideadebisi@gmail.com",
//   subject: "Welcome to Droplane",
//   text: "sendgrids data easy to do anywhere, even with Node.js",
//   html: "<strong>But first, you need to verify your account!</strong>",
//   mailSettings: { sandboxMode: { enable: false } },
// };
// sgMail
//   .send(msg)
//   .then((data) => {
//     console.log("Email sent", data);
//   })
//   .catch((error) => {
//     console.error("error: ", error);
//   });

// const msg = {
//   to: `${email}`,
//   from: serverEnv.SENDGRID_EMAIL_FROM,
//   subject: "Welcome to Droplane",
//   text: "sendgrids data easy to do anywhere, even with Node.js",
//   html: "<strong>But first, you need to verify your account!</strong>",
// };

// const res = await sendEmail({
//   ...msg,
// });
