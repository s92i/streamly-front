import { PlansTable } from "@/components/features/sponsorship/plan/table/PlansTable";
import { NO_INDEX_PAGE } from "@/lib/constants/seo.constants";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.dashboard.plans.header");

  return {
    title: t("heading"),
    description: t("description"),
    ...NO_INDEX_PAGE,
  };
}

export default function PlansPage() {
  return (
    <div className="p-10">
      <PlansTable />
    </div>
  );
}
