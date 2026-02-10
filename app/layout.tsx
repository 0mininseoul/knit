import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KNIT",
  description: "Connecting knitted hearts",
};

import FontSizeManager from "@/components/ui/FontSizeManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen flex justify-center items-center`}>
        <FontSizeManager />
        <div className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl overflow-hidden relative">
          {children}
        </div>
      </body>
    </html>
  );
}
