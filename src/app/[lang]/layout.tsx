import "@/src/app/globals.css";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/NavBar/NavBar";
import "@/src/i18n/settings";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

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
