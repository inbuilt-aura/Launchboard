import "./globals.css";
import { bricolage, poppins } from "./fonts";
import { ReactNode } from "react";
import Navbar from "../components/navbar";
import { Toaster } from "react-hot-toast";
import { Providers } from "../components/Providers";

export const metadata = {
  title: "Launchboard - Crowdfunding to Crowdbuilding",
  description:
    "Share ideas, discover opportunities, meet collaborators and get early product feedback through our online community.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${bricolage.variable} ${poppins.variable}`}>
      <body className="antialiased font-poppins">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
