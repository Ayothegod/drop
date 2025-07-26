import * as React from "react";
import {
  Html,
  Head,
  Body,
  Section,
  Img,
  Text,
  Heading,
  Tailwind,
} from "@react-email/components";

interface EmailLayoutProps {
  children: React.ReactNode;
  img?: string;
}

const Base = ({ children, img }: EmailLayoutProps) => (
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Section className="bg-gray-50 font-sans min-h-screen py-8">
          <Section className="mx-auto px-4 max-w-2xl">
            {/* TOP */}
            <Section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* HEADER */}
              <Section className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <Section className="flex items-center gap-8 justify-center">
                  {img && (
                    <Img
                      src="/placeholder.svg?height=40&width=120"
                      alt="MarketPlace"
                      className="h-10"
                    />
                  )}
                  <Heading
                    as="h1"
                    className="text-2xl font-semibold text-white"
                  >
                    Droplane
                  </Heading>
                </Section>
              </Section>

              {/* MAIN */}
              {children}
            </Section>

            {/* FOOTER */}
            <Section className="mt-8 text-center">
              <Text className="text-gray-500 text-sm">
                © 2025 Drop MarketPlace. All rights reserved.
              </Text>
              <Text className="text-gray-400 text-xs mt-2">
                123 Commerce Street, Business City, BC 12345
              </Text>
            </Section>
          </Section>
        </Section>
      </Tailwind>
    </Body>
  </Html>
);

export default Base;
