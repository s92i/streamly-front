"use client";

import { Button } from "@/components/ui/common/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/common/DropdownMenu";
import { ChannelAvatar } from "@/components/ui/elements/ChannelAvatar";
import { ChannelVerified } from "@/components/ui/elements/ChannelVerified";
import { CustomHeading } from "@/components/ui/elements/CustomHeading";
import {
  DataTable,
  DataTableSkeleton,
} from "@/components/ui/elements/DataTable";
import {
  type FindMySponsorsQuery,
  useFindMySponsorsQuery,
} from "@/graphql/generated/output";
import { formateDate } from "@/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function SponsorsTable() {
  const t = useTranslations("layout.dashboard.sponsors");

  const { data, loading: isLoadingSponsors } = useFindMySponsorsQuery();
  const sponsors = data?.findMySponsors ?? [];

  const sponsorsColumn: ColumnDef<FindMySponsorsQuery["findMySponsors"][0]>[] =
    [
      {
        accessorKey: "expiresAt",
        header: t("columns.date"),
        cell: ({ row }) => formateDate(row.original.expiresAt),
      },
      {
        accessorKey: "user",
        header: t("columns.user"),
        cell: ({ row }) => (
          <div className="flex items-center gap-x-2">
            <ChannelAvatar channel={row.original.user} size="sm" />
            <h2>{row.original.user.username}</h2>
            {row.original.user.isVerified && <ChannelVerified size="sm" />}
          </div>
        ),
      },
      {
        accessorKey: "plan",
        header: t("columns.plan"),
        cell: ({ row }) => row.original.plan.title,
      },
      {
        accessorKey: "actions",
        header: t("columns.actions"),
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="size-8 p-0 hover:bg-muted hover:text-primary transition-colors duration-150"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white">
              <Link href={`/${row.original.user.username}`} target="_blank">
                <DropdownMenuItem className="text-white focus:text-gray-100 cursor-pointer hover:bg-gray-50/20 hover:text-gray-100 transition-colors duration-150">
                  <User className="mr-2 size-4" />
                  {t("columns.viewChannel")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];

  return (
    <div className="lg:px-10">
      <CustomHeading
        title={t("header.heading")}
        description={t("header.description")}
        size="lg"
      />
      <div className="mt-5">
        {isLoadingSponsors ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={sponsorsColumn} data={sponsors} />
        )}
      </div>
    </div>
  );
}
