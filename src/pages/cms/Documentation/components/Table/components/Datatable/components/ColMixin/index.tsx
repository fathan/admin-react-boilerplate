import { useState } from "react";
import AppDataTable from "@/components/shared/organisms/AppDataTable";
import { col } from "@/types/createColumns";
import { RowAction } from "@/types/datatable.types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "available" | "out_of_stock" | "discontinued";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRODUCTS = ["Laptop Pro", "Wireless Mouse", "USB-C Hub", "Monitor 4K", "Keyboard Mech"] as const;
const CATEGORIES = ["Electronics", "Accessories", "Peripherals"] as const;

const DATA: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `${PRODUCTS[i % 5]!} ${i + 1}`,
  category: CATEGORIES[i % 3]!,
  price: Math.round((49.99 + i * 23.5) * 100) / 100,
  stock: i % 5 === 0 ? 0 : Math.floor(Math.sin(i + 1) * 50 + 60),
  status: i % 7 === 0 ? "discontinued" : i % 5 === 0 ? "out_of_stock" : "available",
}));

// ─── Columns (col() style — bisa mixin dengan custom ColumnDef) ───────────────

const columns = [
  col<Product>("id",       { header: "ID", size: 60 }),
  col<Product>("name",     { header: "Product Name" }),
  col<Product>("category", { header: "Category" }),
  col<Product>("price",    {
    header: "Price",
    format: (v) => `$${(v as number).toFixed(2)}`
  }),
  col<Product>("stock",    {
    header: "Stock",
    cell: (info) => {
      const stock = info.getValue() as number;
      return (
        <span className={`text-sm font-medium tabular-nums ${stock === 0 ? "text-red-500" : stock < 20 ? "text-amber-500" : "text-gray-700"}`}>
          {stock}
        </span>
      );
    },
  }),
  col<Product>("status",   {
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as string;
      const map: Record<string, { label: string; className: string }> = {
        available:     { label: "Available",     className: "bg-green-100 text-green-700" },
        out_of_stock:  { label: "Out of Stock",  className: "bg-red-100 text-red-600" },
        discontinued:  { label: "Discontinued",  className: "bg-gray-100 text-gray-500" },
      };
      const { label, className } = map[status] ?? map["available"]!;
      return (
        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${className}`}>
          {label}
        </span>
      );
    },
  }),
];

// ─── Row Actions ──────────────────────────────────────────────────────────────

const rowActions: RowAction<Product>[] = [
  {
    label: "Edit",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
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
    isDisabled: (row) => row.status === "discontinued",
    onClick: (row) => alert(`Delete: ${row.name}`),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocTableDatatableColMixin() {
  const [selected, setSelected] = useState<Product[]>([]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">col() Mixin Style</h1>
        <p className="text-sm text-gray-500 mt-1">
          Contoh penggunaan <code className="bg-gray-100 px-1 rounded text-xs font-mono">col()</code> per kolom
          dengan tipe data berbeda (Product).
        </p>
      </div>

      {selected.length > 0 && (
        <div className="mb-4 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          Selected: {selected.map((p) => p.name).join(", ")}
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <AppDataTable<Product>
          title="Product List"
          description="Manage your product inventory"
          data={DATA}
          columns={columns}
          rowKey="id"
          searchable
          searchPlaceholder="Search products..."
          sortable
          pagination
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 20]}
          multiSelect
          columnToggle
          exportCsv
          exportFilename="products.csv"
          highlightOnHover
          striped
          rowActions={rowActions}
          onRowSelect={setSelected}
          onRowClick={(row) => console.log("Clicked:", row.id)}
        />
      </div>
    </div>
  );
}