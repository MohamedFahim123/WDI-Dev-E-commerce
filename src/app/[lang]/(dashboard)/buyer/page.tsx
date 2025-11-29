"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { redirect } from "next/navigation";

export default function BuyerPage() {
  const lang = useRouteLang();

  redirect(`/${lang || "en"}/buyer/profile`);
}
