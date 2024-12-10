import { DataTable } from "./component/table-main";
import { searchParamsCache } from "./configs/search-params";
import { columns } from "./component/table-columns";
import { filterFields } from "./configs/constants";
import { data } from "./configs/data";
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
