import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HolidayCalendarHub — Public Holidays & Long Weekend Optimizer",
  description: "Find public holidays and optimize long weekends across 20+ countries worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: '#fdf4ff' }}>{children}</body>
    </html>
  );
}
