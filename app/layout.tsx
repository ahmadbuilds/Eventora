import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/app/components/Header";
import "./globals.css";

const inter=Inter({
  subsets:["latin"],
  variable:"--font-inter"
})
export const metadata: Metadata = {
  title: "Ticketr",
  description: "Ticket Selling Platform",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} antialiased`}
        >
          {/* Header  */}
          <Header/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
