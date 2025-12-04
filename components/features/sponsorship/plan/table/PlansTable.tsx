"use client";

import { useCurrent } from "@/hooks/useCurrent";
import { useTranslations } from "next-intl";
import { VerifiedChannelAlert } from "./VerifiedChannelAlert";
import { CustomHeading } from "@/components/ui/elements/CustomHeading";
import { CreatePlanForm } from "../forms/CreatePlanForm";
import {
  type FindMySponsorshipPlansQuery,
  useFindMySponsorshipPlansQuery,
  useRemoveSponsorshipPlanMutation,
} from "@/graphql/generated/output";
import { ColumnDef } from "@tanstack/react-table";
import { formateDate } from "@/utils/format-date";
import { convertPrice } from "@/utils/convert-price";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/common/DropdownMenu";
import { Button } from "@/components/ui/common/Button";
import { MoreHorizontal, Trash } from "lucide-react";
import {
  DataTable,
  DataTableSkeleton,
} from "@/components/ui/elements/DataTable";

export function PlansTable() {
  const t = useTranslations("layout.dashboard.plans");

  const { user } = useCurrent();

  const {
    data,
    loading: isLoadingPlans,
    refetch,
  } = useFindMySponsorshipPlansQuery();
  const plans = data?.findMySponsorshipPlans ?? [];

  const plansColumn: ColumnDef<
    FindMySponsorshipPlansQuery["findMySponsorshipPlans"][0]
  >[] = [
    {
      accessorKey: "createdAt",
      header: t("columns.date"),
      cell: ({ row }) => formateDate(row.original.createdAt),
    },
    {
      accessorKey: "title",
      header: t("columns.title"),
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: "price",
      header: t("columns.price"),
      cell: ({ row }) => convertPrice(row.original.price),
    },
    {
      accessorKey: "actions",
      header: t("columns.actions"),
      cell: ({ row }) => {
        const [remove, { loading: isLoadingRemove }] =
          useRemoveSponsorshipPlanMutation({
            onCompleted() {
              refetch();
              toast.success(t("columns.successMessage"));
            },
            onError() {
              toast.error(t("columns.errorMessage"));
            },
          });

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="size-8 p-0 hover:bg-muted hover:text-primary transition-colors duration-150"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  remove({ variables: { planId: row.original.id } })
                }
                className="text-red-500 focus:text-red-500 cursor-pointer hover:bg-red-50/20 hover:text-red-700 transition-colors duration-150"
                disabled={isLoadingRemove}
              >
                <Trash className="mr-2 size-4" />
                {t("columns.remove")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return user?.isVerified ? (
    <div className="lg:px-10">
      <div className="block items-center justify-between space-y-3 lg:flex lg:space-y-0">
        <CustomHeading
          title={t("header.heading")}
          description={t("header.description")}
          size="lg"
        />
        <CreatePlanForm />
      </div>
      <div className="mt-5">
        {isLoadingPlans ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={plansColumn} data={plans} />
        )}
      </div>
    </div>
  ) : (
    <VerifiedChannelAlert />
  );
}
