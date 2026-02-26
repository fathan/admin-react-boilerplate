import { useEffect, useState } from "react";
import AppDataTable from "@/components/shared/organisms/AppDataTable";
import { createColumns } from "@/types/createColumns";
import { RowAction, ServerSideParams } from "@/types/datatable.types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  joinDate: string;
  score: number;
}

// ─── Mock Data + Fetch ────────────────────────────────────────────────────────

const NAMES = ["Alice Johnson", "Bob Smith", "Carol White", "David Brown", "Eva Martinez"] as const;
const ROLES = ["admin", "editor", "viewer"] as const;

const ALL_DATA: User[] = Array.from({ length: 87 }, (_, i) => ({
  id: i + 1,
  name: NAMES[i % 5]!,
  email: `user${i + 1}@example.com`,
  role: ROLES[i % 3]!,
  status: i % 4 === 0 ? "inactive" : "active",
  joinDate: new Date(2022, i % 12, (i % 28) + 1).toLocaleDateString("id-ID"),
  score: Math.round((Math.sin(i) * 0.5 + 0.5) * 100),
}));

async function fetchUsers(
  params: ServerSideParams
): Promise<{ data: User[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...ALL_DATA];

      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        );
      }

      const sortCol = params.sorting[0];
      if (sortCol) {
        const { id, desc } = sortCol;
        filtered.sort((a, b) => {
          const aVal = a[id as keyof User] ?? "";
          const bVal = b[id as keyof User] ?? "";
          const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          return desc ? -cmp : cmp;
        });
      }

      const total = filtered.length;
      const start = (params.page - 1) * params.pageSize;
      const data = filtered.slice(start, start + params.pageSize);

      resolve({ data, total });
    }, 600);
  });
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns = createColumns<User>({
  id: { header: "ID", size: 60 },
  name: {
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
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
            <div className="h-full bg-violet-500 rounded-full" style={{ width: `${score}%` }} />
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
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocTableDatatableServerSide() {
  const [data, setData]       = useState<User[]>([]);
  const [totalRows, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleParamsChange = async (params: ServerSideParams) => {
    setLoading(true);
    try {
      const result = await fetchUsers(params);
      setData(result.data);
      setTotal(result.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleParamsChange({ page: 1, pageSize: 10, search: "", sorting: [] });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Server-Side Datatable</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pagination, sort, dan search dihandle di server. Simulasi latency 600ms.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <AppDataTable<User>
          title="Users (Server-Side)"
          data={data}
          columns={columns}
          rowKey="id"
          serverSide
          totalRows={totalRows}
          loading={loading}
          onParamsChange={handleParamsChange}
          searchable
          searchPlaceholder="Search name or email..."
          sortable
          pagination
          defaultPageSize={10}
          pageSizeOptions={[10, 25, 50]}
          columnToggle
          exportCsv
          exportFilename="users-server.csv"
          columnPinning
          rowActions={rowActions}
          maxVisibleRowActions={2}
          highlightOnHover
        />
      </div>
    </div>
  );
}