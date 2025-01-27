import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { AppWrapper } from "@/context/contextAPI";
import toast, { Toaster } from "react-hot-toast";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quarter 3 Hackathon",
  description: "Ecommerce Website Using Next js and sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1400px] mx-auto`}
      >
        <AppWrapper>
          <div className="flex flex-col min-h-screen justify-between">
            <div>
              <Header />
              <main>{children}</main>
              <Toaster />
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
