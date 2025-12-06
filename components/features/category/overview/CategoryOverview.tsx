"use client";

import { CustomHeading } from "@/components/ui/elements/CustomHeading";
import { FindCategoryBySlugQuery } from "@/graphql/generated/output";
import { constructUrl } from "@/utils/construct-urls";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { StreamsList } from "../../stream/list/StreamsList";

interface CategoryOverviewProps {
  category: FindCategoryBySlugQuery["findCategoryBySlug"];
}

export function CategoryOverview({ category }: CategoryOverviewProps) {
  const t = useTranslations("layout.categories.overview");

  return (
    <div className="space-y-8">
      <div className="gap-x-6 lg:flex lg:items-center lg:space-y-6">
        <Image
          src={constructUrl(category.thumbnailUrl)!}
          alt={category.title}
          width={192}
          height={256}
          className="rounded-xl object-cover"
        />
        <CustomHeading
          title={category.title}
          description={category.description ?? ""}
          size="xl"
        />
      </div>
      <StreamsList heading={t("heading")} streams={category.streams} />
    </div>
  );
}
