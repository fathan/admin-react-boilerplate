import { useCallback, useState } from "react";
import { Edit, PlusCircle, Trash } from "lucide-react";

import { createColumns } from "@/types/createColumns";
import { RowAction, ServerSideParams } from "@/types/datatable.types";
import { User } from "@/types/user.types";

import { useUsers } from "@/hooks/api/users";
import { usePageTitle } from "@/hooks/shared/usePageTitle";

import AppDataTable from "@/components/shared/organisms/AppDataTable";
import { Button } from "@chakra-ui/react";


// ─── Columns ──────────────────────────────────────────────────────────────────

const columns = createColumns<User>({
  id: { header: "ID", size: 60 },
  name: {
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          {info.row.original.name.charAt(0)}
        </div>
        <span className="font-medium text-gray-800">{info.getValue()}</span>
      </div>
    ),
  },
  email: {
    header: "Email",
    cell: (info) => <span className="text-gray-500 text-sm">{info.getValue()}</span>,
  },
});

// ─── Row Actions ──────────────────────────────────────────────────────────────

const rowActions: RowAction<User>[] = [
  {
    label: "Edit",
    icon: (
      <Edit size={14} strokeWidth={2} className="w-3.5 h-3.5" />
    ),
    colorPalette: "yellow",
    onClick: (row) => console.log("Edit:", row),
  },
  {
    label: "Delete",
    icon: (
      <Trash size={14} strokeWidth={2} className="w-3.5 h-3.5" />
    ),
    colorPalette: "red",
    isDisabled: (row) => row.role === "admin",
    onClick: (row) => console.log("Delete:", row),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CmsRolesList() {
  usePageTitle("Visitors");

  const [params, setParams] = useState<ServerSideParams>({
    page: 1,
    pageSize: 10,
    search: "",
    sorting: [],
  });

  const { data, isLoading, isFetching } = useUsers(params);

  const handleParamsChange = useCallback((newParams: ServerSideParams) => {
    setParams(newParams);
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-[#12110e] rounded-2xl p-6 shadow-sm border border-gray-100">
        <AppDataTable<User>
          data={data?.data.data ?? []}
          totalRows={data?.data.meta.total ?? 0}
          loading={isLoading || isFetching}
          columns={columns}
          rowKey="id"
          serverSide
          onParamsChange={handleParamsChange}
          searchable
          searchPlaceholder="Search name or email..."
          sortable
          pagination
          defaultPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          columnToggle
          exportCsv
          exportPdf
          // exportFilename="users.csv"
          columnPinning
          multiSelect
          rowActions={rowActions}
          maxVisibleRowActions={2}
          highlightOnHover
          onRowSelect={(rows) => console.log("Selected:", rows)}
          leftToolbarContent={
            <Button colorPalette="red">
              <Trash size={14} strokeWidth={2} className="w-4 h-4 mr-2" />
              Delete
            </Button>
          }
          rightToolbarContent={
            <Button variant="solid" colorPalette="blue">
              <PlusCircle size={14} strokeWidth={2} className="w-4 h-4 mr-2" />
              Add User
            </Button>
          }
        />
      </div>
    </>
  );
}