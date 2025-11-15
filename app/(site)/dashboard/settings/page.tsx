import { UserSettings } from "@/components/features/user/UserSettings";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.dashboard.settings.header");

  return {
    title: t("heading"),
    description: t("description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function SettingsPage() {
  return (
    <div className="p-10">
      <UserSettings />
    </div>
  );
}
