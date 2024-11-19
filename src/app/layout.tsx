// app/layout.tsx
import "./globals.css";
import { bricolage, poppins } from "./fonts";
// import Navbar from "@/components/ui/navbar";
// import Footer from "@/components/ui/footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Launchboard - Crowdfunding to Crowdbuilding",
  description: "Share ideas, discover opportunities, meet collaborators and get early product feedback through our online community.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${bricolage.variable} ${poppins.variable}`}>
      <body className="antialiased font-poppins ">
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
