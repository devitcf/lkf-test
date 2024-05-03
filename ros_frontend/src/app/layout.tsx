import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({ weight: ["300", "400", "500", "700"], subsets: ["latin"], display: "swap" });

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
