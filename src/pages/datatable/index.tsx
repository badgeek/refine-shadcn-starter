import { DataTable } from "./component/table-main";
import { searchParamsCache } from "./configs/search-params";
import { columns } from "./component/table-columns";
import { filterFields } from "./configs/constants";
import { data } from "./configs/dummy-data";
import { useParams } from "react-router-dom";
import { Main } from "@/components/layout/main";

export function DataTablePage() {
  const searchParams = useParams();
  const search = searchParamsCache(searchParams);

  return (
    <Main>
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
    </Main>
  );
}
