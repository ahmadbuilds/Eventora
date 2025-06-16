import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/app/components/Header";
import "./globals.css";
import { ConvexClientProvider } from "./components/ConvexClientProvider";
import SyncUserWithConvex from "./components/SyncUserWithConvex";

const inter=Inter({
  subsets:["latin"],
  variable:"--font-inter"
})
export const metadata: Metadata = {
  title: "Ticketr",
  description: "Ticket Selling Platform for every kind of event",
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
          <ConvexClientProvider>
            {/* Header  */}
            <Header/>
            <SyncUserWithConvex></SyncUserWithConvex>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
