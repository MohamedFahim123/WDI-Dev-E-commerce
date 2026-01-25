import "@/src/app/globals.css";
import AppClientHydrator from "@/src/components/AppClientHydrator/AppClientHydrator";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/NavBar/NavBar";
import { StoresHydrator } from "@/src/components/StoreHydrator/StoreHydrator";
import "@/src/i18n/settings";
import { languages } from "@/src/i18n/settings";
import {
  getProductsSeed
} from "@/src/services/product.service";
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
  const seed = await getProductsSeed();

  return (
    <>
      <AppClientHydrator initialSeedProducts={seed.products} />
      <StoresHydrator />
      <Navbar initialSeedProducts={seed.products} />
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
