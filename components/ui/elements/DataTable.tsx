"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../common/Table";
import { useTranslations } from "next-intl";
import { Card } from "../common/Card";
import { Loader } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations("layout.components.dataTable");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto overflow-y-hidden rounded-lg border bg-background">
      <Table className="min-w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted">
              {headerGroup.headers.map((header, idx) => (
                <TableHead
                  key={header.id}
                  className={`px-6 py-4 text-left align-middle font-semibold text-foreground ${
                    idx === 0 ? "rounded-tl-lg" : ""
                  } ${
                    idx === headerGroup.headers.length - 1
                      ? "rounded-tr-lg"
                      : ""
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="transition-colors"
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <TableCell
                    key={cell.id}
                    className={`px-6 py-4 align-middle ${
                      idx === 0 ? "rounded-bl-lg" : ""
                    } ${
                      idx === row.getVisibleCells().length - 1
                        ? "rounded-br-lg"
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center align-middle px-6 py-4"
              >
                {t("notFound")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function DataTableSkeleton() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full mb-10 flex justify-center">
      <Card className="mt-6 flex h-[500px] w-full items-center justify-center">
        <Loader className="size-8 animate-spin text-muted-foreground" />
      </Card>
    </div>
  );
}
