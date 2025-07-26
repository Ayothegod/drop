import nodemailer from 'nodemailer';
import serverEnv from './serverEnv.js';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${serverEnv.SENDGRID_EMAIL_FROM}`,
    pass: `${serverEnv.GOOGLE_APP_PASSWORD}`,
  },
});