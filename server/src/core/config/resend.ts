import { Resend } from "resend";
import serverEnv from "./serverEnv";

export const resend = new Resend(serverEnv.RESEND_API_KEY);
