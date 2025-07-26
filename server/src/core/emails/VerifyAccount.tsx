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
import serverEnv from "../config/serverEnv.js";

const VerifyAccount = () => (
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Section className="my-[16px]">
          {/* <Img
          alt="Braun Collection"
          className="w-full rounded-[12px] object-cover"
          height={320}
          src="https://react.email/static/braun-collection.jpg"
        /> */}

          <Section className="mt-[32px] text-center">
            <Text className="mt-[16px] font-semibold text-[18px] text-blue-600 leading-[28px]">
              Hi there,
            </Text>
            <Text className="mt-[24px] text-[16px] text-gray-500 leading-[24px]">
              Welcome to Droplane, the marketplace for high quality digital
              goods. Use the button below to verify your account.
            </Text>

            <Button
              className="mt-[16px] rounded-[8px] bg-blue-600 px-[24px] py-[12px] font-semibold text-white"
              href={`${serverEnv.CLIENT_URL}/sort=success`}
            >
              Verify Account
            </Button>
          </Section>

          <Section className="mt-[32px] text-center">
            <Text className="mt-[16px] font-semibold text-[16px] text-blue-600 leading-[28px]">
              Best,
            </Text>
            <Text className="mt-[4px] text-[16px] font-semibold text-gray-500 leading-[24px]">
              The Droplane team.
            </Text>
          </Section>
        </Section>
        <Hr className="my-[16px] border-gray-300 border-t-2" />
        <Text className="text-gray-600 text-[14px]">
          If you did not request this email, you can safely ignore it.
        </Text>
      </Tailwind>
    </Body>
  </Html>
);

export default VerifyAccount;

export const renderVerifyAccount = () => render(<VerifyAccount />);
