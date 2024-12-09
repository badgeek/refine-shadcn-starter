import { DataTable } from "@/pages/restdatatable/datatable-restapi";
import { searchParamsCache } from "@/pages/restdatatable/search-params";
import { columns } from "./columns";
import { data, filterFields } from "./constants";
import { useParams } from "react-router-dom";

export function DataTablePage() {
  const searchParams = useParams();
  const search = searchParamsCache(searchParams);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DataTable
        columns={columns}
        data={data}
        filterFields={filterFields}
        defaultColumnFilters={Object.entries(search)
          .map(([key, value]) => ({
            id: key,
            value,
          }))
          .filter(({ value }) => value ?? undefined)}
      />
    </div>
  );
}
