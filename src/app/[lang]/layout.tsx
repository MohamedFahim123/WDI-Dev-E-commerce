import "@/src/app/globals.css";
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
    <main
      lang={lang}
      className={`min-h-screen`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {children}
    </main>
  );
}
