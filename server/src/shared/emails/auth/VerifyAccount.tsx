import { Heading, Hr, render, Section, Text } from "@react-email/components";
import * as React from "react";
import { EmailButton } from "../EmailButton.js";
import EmailLayout from "../EmailLayout.js";

interface EmailVerificationProps {
  fullName: string;
  verificationUrl: string;
}

const VerifyAccount = ({
  fullName = "John Doe",
  verificationUrl,
}: EmailVerificationProps) => (
  <EmailLayout
    head="Verify Your Email Address"
    img="https://img.icons8.com/?size=100&id=xLIkjgcmFOsC&format=png&color=000000"
  >
    <Section className="px-8 py-8">
      <Text className="text-gray-700 text-base font-semibold leading-6 mb-6">
        Hi {fullName},
      </Text>

      <Text className="text-gray-700 text-base leading-6 mb-6">
        Welcome to Drop, your digital marketplace! To complete your registration
        and start buying and selling, please verify your email address by
        clicking the button below.
      </Text>

      <Section className="text-center mb-8">
        <EmailButton href={verificationUrl}>Verify Email Address</EmailButton>
      </Section>

      <Hr className="border-gray-200 my-6" />

      <Text className="text-gray-500 text-sm leading-5">
        This verification link will expire in 30 minutes. If you didn't create
        an account with Drop Marketplace, you can safely ignore this email.
      </Text>
    </Section>
  </EmailLayout>
);

export default VerifyAccount;

export const renderVerifyAccount = (name: string, verificationUrl: string) =>
  render(<VerifyAccount fullName={name} verificationUrl={verificationUrl} />);
