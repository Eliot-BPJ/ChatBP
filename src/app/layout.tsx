import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat ByPass",
  description: "Created by SomeOne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          style={{
            background: "rgb(25, 26, 26)",
            fontFamily: "CascadiaCode,monospace",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
