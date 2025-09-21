import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/lib/providers/StoreProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmeraldScentSational - Discover Your Signature Scent",
  description:
    "Luxury fragrances and perfumes for the discerning individual. Discover your signature scent with our premium collection.",
  keywords: "perfume, fragrance, luxury, scent, cologne, eau de parfum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <StoreProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#7e22ce",
                  color: "#fff",
                },
              }}
            />
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
