import "@/src/app/globals.css";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/NavBar/NavBar";
import "@/src/i18n/settings";
import { languages } from "@/src/i18n/settings";
import { redirect } from "next/navigation";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!languages.find((l) => l.code === lang)) {
    redirect("/en");
  }

  return (
    <>
      <Navbar />

      <main
        lang={lang}
        className={`flex-1`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
