"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="text-4xl font-bold text-blue-500">
      {t("title")}
      <h1 className="-px-10 text-3xl text-red-500">test</h1>
    </div>
  );
}
