import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Provider from "@/providers/Provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home - ASK DEV",
  description: "This is ask-dev home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased`}
        data-new-gr-c-s-check-loaded="14.1218.0"
        data-gr-ext-installed=""
        data-gr-ext-disabled="forever"
        cz-shortcut-listen="true"
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
