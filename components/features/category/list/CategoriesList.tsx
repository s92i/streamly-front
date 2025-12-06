import { CustomHeading } from "@/components/ui/elements/CustomHeading";
import { EmptyState } from "@/components/ui/elements/EmptyState";
import type { FindRandomCategoriesQuery } from "@/graphql/generated/output";
import { CategoryCard } from "./CategoryCard";

interface CategoriesListProps {
  heading?: string;
  categories: FindRandomCategoriesQuery["findRandomCategories"];
}

export function CategoriesList({ heading, categories }: CategoriesListProps) {
  return categories.length ? (
    <>
      {heading && <CustomHeading title={heading} />}
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </>
  ) : (
    <EmptyState />
  );
}
