import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Noto_Serif({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Ordering System",
  description: "A restaurant ordering system by Next.js",
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
