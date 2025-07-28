import {
  Column,
  Heading,
  Hr,
  render,
  Row,
  Section,
  Text,
} from "@react-email/components";
import EmailLayout from "../EmailLayout";
import * as React from "react";
import { EmailButton } from "../EmailButton";
import serverEnv from "../../../core/config/env";

interface PasswordResetProps {
  fullname: string;
  resetUrl: string;
}

export const PasswordReset = ({
  fullname = "John Doe",
  resetUrl,
}: PasswordResetProps) => {
  return (
    <EmailLayout head="Reset your Drop password">
      <Section className="px-8 py-8">
        <Text className="text-gray-700 text-base leading-6 mb-6">
          Hi {fullname},
        </Text>

        <Text className="text-gray-700 text-base leading-6 mb-6">
          We received a request to reset your password for your Drop Marketplace
          account. Click the button below to create a new password.
        </Text>

        <Section className="text-center mb-8">
          <EmailButton href={resetUrl}>Reset Password</EmailButton>
        </Section>

        <Hr className="border-gray-200 my-6" />

        <Text className="text-gray-500 text-sm leading-5">
          This password reset link will expire in 30 minutes. If you didn't
          request a password reset, please ignore this email or contact our
          support team if you have concerns.
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default PasswordReset;

export const renderPasswordReset = (
  fullname: string,
  resetPasswordUrl: string
) => render(<PasswordReset fullname={fullname} resetUrl={resetPasswordUrl} />);
