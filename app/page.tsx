"use client";

import { Button } from "@/components/ui/common/Button";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      <div className="text-4xl font-bold text-blue-500">{t("title")}</div>
      <div>
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </>
  );
}
