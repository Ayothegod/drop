import sgMail from "@sendgrid/mail";
import serverEnv from "./serverEnv";

export const sendEmail = (msg: any) =>
  sgMail.send({
    from: "you@gmail.com",
    ...msg,
  });
