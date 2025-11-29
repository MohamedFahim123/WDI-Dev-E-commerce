"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { redirect } from "next/navigation";

export default function SellerPage() {
  const lang = useRouteLang();

  redirect(`/${lang || "en"}/seller/profile`);
}
