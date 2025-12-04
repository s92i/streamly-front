import { FollowersTable } from "@/components/features/follow/table/FollowersTable";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.dashboard.followers.header");

  return {
    title: t("heading"),
    description: t("description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function FollowersPage() {
  return (
    <div className="p-10">
      <FollowersTable />
    </div>
  );
}
