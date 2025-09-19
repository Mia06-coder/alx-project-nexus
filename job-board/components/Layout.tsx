import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import { Poppins } from "next/font/google";

type LayoutProps = {
  children: ReactNode;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`${poppins.variable} font-sans flex flex-col min-h-screen`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
