import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clacon = localFont({
  src: "../../public/clacon2.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chat BP",
  description: "Created by Someone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clacon.className}>
      <body>
        <div
          style={{
            background: "rgb(25, 26, 26)",
            color: "#FFFFFF",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
