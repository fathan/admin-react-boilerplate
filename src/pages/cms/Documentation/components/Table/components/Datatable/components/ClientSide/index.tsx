import { useState } from "react";
import AppDataTable from "@/components/shared/organisms/AppDataTable";
import { createColumns } from "@/types/createColumns";
import { RowAction } from "@/types/datatable.types";

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  joinDate: string;
  score: number;
  detail: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const NAMES = ["Alice Johnson", "Bob Smith", "Carol White", "David Brown", "Eva Martinez"] as const;
const ROLES = ["admin", "editor", "viewer"] as const;

const DATA: User[] = Array.from({ length: 87 }, (_, i) => ({
  id: i + 1,
  name: NAMES[i % 5]!,
  email: `user${i + 1}@example.com`,
  role: ROLES[i % 3]!,
  status: i % 4 === 0 ? "inactive" : "active",
  joinDate: new Date(2022, i % 12, (i % 28) + 1).toLocaleDateString("id-ID"),
  score: Math.round((Math.sin(i) * 0.5 + 0.5) * 100),
  detail: `Detail lengkap untuk user ${i + 1}. Lorem ipsum dolor sit amet.`,
}));

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
  role: {
    header: "Role",
    cell: (info) => {
      const role = info.getValue() as string;
      const colors: Record<string, string> = {
        admin: "bg-purple-100 text-purple-700",
        editor: "bg-blue-100 text-blue-700",
        viewer: "bg-gray-100 text-gray-600",
      };
      return (
        <span className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${colors[role]}`}>
          {role}
        </span>
      );
    },
  },
  status: {
    header: "Status",
    cell: (info) => {
      const active = info.getValue() === "active";
      return (
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-500" : "bg-gray-300"}`} />
          <span className={`text-xs font-medium capitalize ${active ? "text-green-700" : "text-gray-400"}`}>
            {info.getValue()}
          </span>
        </div>
      );
    },
  },
  joinDate: { header: "Join Date", sortable: false },
  score: {
    header: "Score",
    cell: (info) => {
      const score = info.getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${score}%` }} />
          </div>
          <span className="text-xs text-gray-500 tabular-nums">{score}</span>
        </div>
      );
    },
  },
});

// ─── Row Actions ──────────────────────────────────────────────────────────────

const rowActions: RowAction<User>[] = [
  {
    label: "Edit",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    colorPalette: "yellow",
    onClick: (row) => alert(`Edit: ${row.name}`),
  },
  {
    label: "Delete",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    colorPalette: "red",
    isDisabled: (row) => row.role === "admin",
    onClick: (row) => alert(`Delete: ${row.name}`),
  },
  {
    label: "View Profile",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    onClick: (row) => alert(`View: ${row.name}`),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocTableDatatableClientSide() {
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Client-Side Datatable</h1>
        <p className="text-sm text-gray-500 mt-1">
          Semua data di-load sekaligus, filtering/sort/pagination di frontend.
        </p>
      </div>

      {selected.length > 0 && (
        <div className="mb-4 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          Selected: {selected.map((u) => u.name).join(", ")}
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <AppDataTable<User>
          title="User Management"
          description="Manage all registered users"
          data={DATA}
          columns={columns}
          rowKey="id"
          searchable
          searchPlaceholder="Search name or email..."
          sortable
          pagination
          defaultPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          multiSelect
          expandable
          columnToggle
          exportCsv
          exportFilename="users.csv"
          columnPinning
          striped
          highlightOnHover
          rowActions={rowActions}
          maxVisibleRowActions={2}
          renderExpandedRow={(row) => (
            <div className="flex items-start gap-3 py-1">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {row.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">{row.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{row.detail}</p>
                <div className="flex gap-2 mt-1.5">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">Score: {row.score}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">Joined: {row.joinDate}</span>
                </div>
              </div>
            </div>
          )}
          onRowSelect={setSelected}
          onRowClick={(row) => console.log("Clicked:", row.id)}
        />
      </div>
    </div>
  );
}