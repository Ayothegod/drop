import {
  Link
} from "@react-email/components";
import React from "react";

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  custom?: string
}

export const EmailButton = ({
  href,
  children,
  variant = "primary",
  custom
}: EmailButtonProps) => {
  const baseClasses =
    "inline-block px-6 py-3 rounded-lg font-semibold text-center no-underline transition-colors";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white"
      : "bg-gray-100 text-gray-800 border border-gray-300";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses} ${custom}`}>
      {children}
    </Link>
  );
};
