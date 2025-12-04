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
  type FindMyFollowersQuery,
  useFindMyFollowersQuery,
} from "@/graphql/generated/output";
import { formateDate } from "@/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function FollowersTable() {
  const t = useTranslations("layout.dashboard.followers");

  const { data, loading: isLoadingFollowers } = useFindMyFollowersQuery();
  const followers = data?.findMyFollowers ?? [];

  const followersColumn: ColumnDef<
    FindMyFollowersQuery["findMyFollowers"][0]
  >[] = [
    {
      accessorKey: "createdAt",
      header: t("columns.date"),
      cell: ({ row }) => formateDate(row.original.createdAt),
    },
    {
      accessorKey: "follower",
      header: t("columns.user"),
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          <ChannelAvatar channel={row.original.follower} size="sm" />
          <h2>{row.original.follower.username}</h2>
          {row.original.follower.isVerified && <ChannelVerified size="sm" />}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: t("columns.actions"),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-primary">
            <Link href={`/${row.original.follower.username}`} target="_blank">
              <DropdownMenuItem className="cursor-pointer">
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
        {isLoadingFollowers ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={followersColumn} data={followers} />
        )}
      </div>
    </div>
  );
}
