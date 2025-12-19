import { ChangeChatSettings } from "@/components/features/chat/settings/ChangeChatSettings";
import { NO_INDEX_PAGE } from "@/lib/constants/seo.constants";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.dashboard.chat.header");

  return {
    title: t("heading"),
    description: t("description"),
    ...NO_INDEX_PAGE,
  };
}

export default function ChatSettingsPage() {
  return (
    <div className="p-10">
      <ChangeChatSettings />
    </div>
  );
}
