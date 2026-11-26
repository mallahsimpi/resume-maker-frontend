
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeCraft | Professional Resume Builder",
  description:
    "Create professional resumes with ResumeCraft."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
