import { Geist } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Hotel Pacific Reef",
  description: "Un hotel de ensueño en la costa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.className} antialiased`}
      >
        <div className="bg-[url('/assets/images/background.jpeg')] h-screen bg-cover bg-center blur-[2px]" />
        <Navbar />
        {children}
        
      </body>
    </html>
  );
}
