import "@/src/i18n/settings";
import type { Metadata } from "next";
import "@/src/app/globals.css";
import Navbar from "@/src/components/NavBar/NavBar";
import { Toaster } from "sonner";
import Footer from "@/src/components/Footer/Footer";

export const metadata: Metadata = {
  title: "WDI Market",
  description:
    "Welcome to our Market , You can find all products you need here!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body>
        <Navbar />
        <Toaster position="top-right" richColors />
        {children}
        <Footer />
      </body>
    </html>
  );
}
