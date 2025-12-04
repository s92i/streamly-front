import { TransactionTable } from "@/components/features/sponsorship/transactions/table/TransactionTable";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("layout.dashboard.transactions.header");

  return {
    title: t("heading"),
    description: t("description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function TransactionsPage() {
  return (
    <div className="p-10">
      <TransactionTable />
    </div>
  );
}
