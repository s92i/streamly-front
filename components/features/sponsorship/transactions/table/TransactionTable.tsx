"use client";

import {
  type FindMyTransactionsQuery,
  TransactionStatus,
  useFindMyTransactionsQuery,
} from "@/graphql/generated/output";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";
import { formateDate } from "@/utils/format-date";
import { convertPrice } from "@/utils/convert-price";
import { CustomHeading } from "@/components/ui/elements/CustomHeading";
import {
  DataTable,
  DataTableSkeleton,
} from "@/components/ui/elements/DataTable";

export function TransactionTable() {
  const t = useTranslations("layout.dashboard.transactions");

  const { data, loading: isLoadingTransactions } = useFindMyTransactionsQuery();
  const transactions = data?.findMyTransactions ?? [];

  const transactionsColumns: ColumnDef<
    FindMyTransactionsQuery["findMyTransactions"][0]
  >[] = [
    {
      accessorKey: "createdAt",
      header: t("columns.date"),
      cell: ({ row }) => formateDate(row.original.createdAt),
    },
    {
      accessorKey: "status",
      header: t("columns.status"),
      cell: ({ row }) => {
        const status = row.original.status;
        let statusColor = "";

        switch (status) {
          case TransactionStatus.Success:
            statusColor = "text-green-500";
            return (
              <div className={`py-1.5 ${statusColor}`}>
                {t("columns.success")}
              </div>
            );
          case TransactionStatus.Pending:
            statusColor = "text-yellow-500";
            return (
              <div className={`py-1.5 ${statusColor}`}>
                {t("columns.pending")}
              </div>
            );
          case TransactionStatus.Failed:
            statusColor = "text-red-500";
            return (
              <div className={`py-1.5 ${statusColor}`}>
                {t("columns.failed")}
              </div>
            );
          case TransactionStatus.Expired:
            statusColor = "text-purple-500";
            return (
              <div className={`py-1.5 ${statusColor}`}>
                {t("columns.expired")}
              </div>
            );
          default:
            statusColor = "text-foreground";
            return <div className={`py-1.5 ${statusColor}`}>{status}</div>;
        }
      },
    },
    {
      accessorKey: "amount",
      header: t("columns.amount"),
      cell: ({ row }) => convertPrice(row.original.amount),
    },
  ];

  return (
    <div className="lg:px-10">
      <CustomHeading
        title={t("header.heading")}
        description={t("header.description")}
      />
      <div className="mt-5">
        {isLoadingTransactions ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={transactionsColumns} data={transactions} />
        )}
      </div>
    </div>
  );
}
