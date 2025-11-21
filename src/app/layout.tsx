import "@/src/app/globals.css";
import "@/src/i18n/settings";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});
export const metadata: Metadata = {
  title: "WDI Market",
  description:
    "Welcome to our Market , You can find all products you need here!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <Toaster position="top-right" richColors />

        {children}
      </body>
    </html>
  );
}
