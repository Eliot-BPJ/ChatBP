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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
