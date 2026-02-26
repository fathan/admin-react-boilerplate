import { useCallback, useState } from "react";
import { Edit, Trash } from "lucide-react";

import { createColumns } from "@/types/createColumns";
import { RowAction, ServerSideParams } from "@/types/datatable.types";
import { User } from "@/types/user.types";

import { useUsers } from "@/hooks/api/users";

import AppDataTable from "@/components/shared/organisms/AppDataTable";

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
  // role: {
  //   header: "Role",
  //   cell: (info) => {
  //     const role = info.getValue() as string;
  //     const colors: Record<string, string> = {
  //       admin: "bg-purple-100 text-purple-700",
  //       editor: "bg-blue-100 text-blue-700",
  //       viewer: "bg-gray-100 text-gray-600",
  //     };
  //     return (
  //       <span className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${colors[role]}`}>
  //         {role}
  //       </span>
  //     );
  //   },
  // },
  // status: {
  //   header: "Status",
  //   cell: (info) => {
  //     const active = info.getValue() === "active";
  //     return (
  //       <div className="flex items-center gap-1.5">
  //         <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-500" : "bg-gray-300"}`} />
  //         <span className={`text-xs font-medium capitalize ${active ? "text-green-700" : "text-gray-400"}`}>
  //           {info.getValue()}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
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

export default function CmsUsersList() {
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Users
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all registered users
        </p>
      </div>

      <div className="bg-white dark:bg-[#12110e] rounded-2xl p-6 shadow-sm border border-gray-100">
        <AppDataTable<User>
          title=""
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
        />
      </div>
    </>
  );
}