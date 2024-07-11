import ReactQueryProviders from "@/utils/ReactQueryProviders";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bridge Note",
  description: "Bridge Note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProviders>
        <body className={inter.className}>{children}</body>
      </ReactQueryProviders>
    </html>
  );
}
