import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stefan Popa — Independent Developer",
  description:
    "A portfolio of thoughtful digital products, expressive interfaces, and useful software.",
};

export const viewport: Viewport = {
  themeColor: "#10100f",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
