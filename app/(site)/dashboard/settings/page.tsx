import { UserSettings } from "@/components/features/user/UserSettings";
import { NO_INDEX_PAGE } from "@/lib/constants/seo.constants";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.dashboard.settings.header");

  return {
    title: t("heading"),
    description: t("description"),
    ...NO_INDEX_PAGE,
  };
}

export default function SettingsPage() {
  return (
    <div className="p-10">
      <UserSettings />
    </div>
  );
}
