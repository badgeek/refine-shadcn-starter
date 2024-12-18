import React from "react";
import {
  IResourceComponentsProps,
  useNavigation,
  useMany,
  GetManyResponse,
} from "@refinedev/core";

import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronLeftIcon,
  ChevronRightIcon,
  LucideEdit,
  LucideEye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Main } from "@/components/layout/main";
import { Skeleton } from "@/components/ui/skeleton";

interface ICategory {
  id: number;
  title: string;
}

interface IBlogPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: {
    id: number;
  };
}

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<IBlogPost>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse<ICategory>;
          };
          const category = meta.categoryData?.data?.find(
            (item: ICategory) => item.id === getValue(),
          );

          return category?.title ?? "";
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <div className="flex flex-row flex-nowrap gap-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  show("blog_posts", getValue() as string);
                }}
              >
                <LucideEye size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  edit("blog_posts", getValue() as string);
                }}
              >
                <LucideEdit size={16} />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const { edit, show } = useNavigation();

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQueryResult: { isLoading, data: tableData },
    },
    getState,
    setPageIndex,
    getCanPreviousPage,
    getPageCount,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageSize,
    setOptions,
  } = useTable({
    columns,
    refineCoreProps: {
      meta: {
        populate: ["category"],
      },
    },
  });

  const catList =
    tableData?.data?.map((item: IBlogPost) => item?.category?.id) ?? [];

  const { data: categoryData } = useMany({
    resource: "categories",
    ids: catList,
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <Main>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Blog Posts</h2>
        <p className='text-muted-foreground'>
          Manage your blog posts here.
        </p>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
          >
            <ArrowLeftToLine className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
          >
            <ArrowRightToLine className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {getState().pagination.pageIndex + 1} of {getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${getState().pagination.pageSize}`}
              onValueChange={(value: string) => {
                setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Main>
  );
};