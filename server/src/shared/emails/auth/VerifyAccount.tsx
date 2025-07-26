import * as React from "react";
import {
  Html,
  Head,
  Body,
  Section,
  Img,
  Text,
  Heading,
  Button,
  render,
  Hr,
  Tailwind,
} from "@react-email/components";
import serverEnv from "../../../core/config/serverEnv.js";
import { EmailButton } from "../EmailButton.js";

interface EmailVerificationProps {
  fullName: string;
  verificationUrl: string;
  // verificationCode: string
}

const VerifyAccount = ({
  fullName = "John Doe",
  verificationUrl = "https://marketplace.com/verify",
}: // verificationCode = "ABC123",
EmailVerificationProps) => (
  <div className="px-8 py-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">
      Verify Your Email Address
    </h1>

    <p className="text-gray-700 text-base leading-6 mb-6">Hi {fullName},</p>

    <p className="text-gray-700 text-base leading-6 mb-6">
      Welcome to Droplane, your digital marketplace! To complete your
      registration and start buying and selling, please verify your email
      address by clicking the button below.
    </p>

    <div className="text-center mb-8">
      <EmailButton href={verificationUrl}>Verify Email Address</EmailButton>
    </div>

    <hr className="border-gray-200 my-6" />

    {/* <p className="text-gray-600 text-sm mb-4">
      Or enter this verification code manually:
    </p>

    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center mb-6">
      <span className="font-mono text-lg font-bold text-gray-900 tracking-wider">
        {verificationCode}
      </span>
    </div> */}

    <p className="text-gray-500 text-sm leading-5">
      This verification link will expire in 24 hours. If you didn't create an
      account with MarketPlace, you can safely ignore this email.
    </p>
  </div>
);

export default VerifyAccount;

export const renderVerifyAccount = (name: string, verificationUrl: string) =>
  render(<VerifyAccount fullName={name} verificationUrl={verificationUrl} />);
