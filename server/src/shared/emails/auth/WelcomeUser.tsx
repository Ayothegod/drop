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

interface WelcomeEmailProps {
  fullname: string;
  dashboardUrl?: string;
}

const WelcomeEmail = ({
  fullname = "John Doe",
  dashboardUrl = serverEnv.CLIENT_URL + "/dashboard",
}: WelcomeEmailProps) => {
  return (
    <EmailLayout head="Welcome to Drop Marketplace! 🎉">
      <Section className="px-8 py-8">
        <Text className="text-gray-700 text-base font-semibold leading-6 mb-6">
          Hi {fullname},
        </Text>
        <Text className="text-gray-700 text-base leading-6 mb-6">
          Welcome to Drop Marketplace, where buying and selling is made simple
          and secure. We're excited to have you join our community of buyers and
          sellers.
        </Text>
        <Section className="bg-blue-50 rounded-lg p-6 mb-8">
          <Text className="text-blue-900 font-semibold text-lg mb-4">
            What you can do on Drop MarketPlace:
          </Text>
          <Section className="flex flex-col gap-4">
            <Section className="flex items-start">
              <Text className="text-blue-600 mr-3">🛍️</Text>
              <Text className="text-blue-800 text-sm">
                Browse digital products from verified sellers
              </Text>
            </Section>
            <Section className="flex items-start">
              <Text className="text-blue-600 mr-3">💰</Text>
              <Text className="text-blue-800 text-sm">
                Start selling your own products with zero listing fees
              </Text>
            </Section>
            <Section className="flex items-start">
              <Text className="text-blue-600 mr-3">🔒</Text>
              <Text className="text-blue-800 text-sm">
                Enjoy secure payments and buyer protection
              </Text>
            </Section>
            <Section className="flex items-start">
              <Text className="text-blue-600 mr-3">📱</Text>
              <Text className="text-blue-800 text-sm">
                Track orders and manage your account easily
              </Text>
            </Section>
          </Section>
        </Section>
        <Section className="text-center mb-8">
          <EmailButton href={dashboardUrl}>Drop dashboard</EmailButton>
        </Section>
        <Hr className="border-gray-200 my-6" />
        <Text className="text-gray-600 text-sm leading-5 mb-4 text-center">
          Need help getting started? Our support team is here to help:
        </Text>

        <Section className="text-center w-full">
          <EmailButton
            href={`${serverEnv.CLIENT_URL}/help-center`}
            variant="secondary"
            custom="mr-8"
          >
            Help Center
          </EmailButton>

          <EmailButton
            href={`mailto:${serverEnv.SENDGRID_EMAIL_FROM}`}
            variant="secondary"
            custom="ml-8"
          >
            Contact Support
          </EmailButton>
        </Section>

        {/* <Row className="mt-[16px] w-full">
          <Column align="left" className="w-1/2 mr-8" colSpan={1}>
            <EmailButton
              href={`${serverEnv.CLIENT_URL}/help-center`}
              variant="secondary" custom="w-full border"
            >
              Help Center
            </EmailButton>
          </Column>
          <Column align="left" className="w-1/2 ml-8" colSpan={1}>
            <EmailButton
              href={`mailto:${serverEnv.SENDGRID_EMAIL_FROM}`}
              variant="secondary" custom="w-full border"
            >
              Contact Support
            </EmailButton>
          </Column>
        </Row> */}
      </Section>
    </EmailLayout>
  );
};

export default WelcomeEmail;

export const renderWelcomeEmail = (fullname: string, dashboardUrl?: string) =>
  render(<WelcomeEmail fullname={fullname} dashboardUrl={dashboardUrl} />);
