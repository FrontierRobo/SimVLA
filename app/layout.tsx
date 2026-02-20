import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SimVLA",
    template: "%s",
  },
  description: "SimVLA: A Simple VLA Baseline for Robotic Manipulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${inter.className} min-h-dvh bg-[#faf8f2] text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
