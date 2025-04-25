import type { Metadata } from "next";
import "./globals.css";
import Home from "./page";

export const metadata: Metadata = {
  title: "Stuntor.id",
  description: "Stuntor.id is a webside stunting monitoring system for children under five years old.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased scroll-smooth overflow-y-auto`}>
        {children}
      </body>
    </html>
  );
}
