import { PlusCircle } from "lucide-react";
import BaseEmptyData from "@/components/shared/atoms/BaseEmptyData";

export default function DocMiscEmptyData() {
  return (
    <>
      <BaseEmptyData
        icon={PlusCircle}
        title="Belum ada produk"
        description="Silakan tambahkan produk pertama kamu."
        action={
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Tambah Produk
          </button>
        }
      />

      <BaseEmptyData loading />

      <BaseEmptyData illustration="https://placehold.co/600x400/EEE/31343C" />

      <BaseEmptyData
        tableMode
        colSpan={10}
        fullHeight
      />

      <BaseEmptyData fullHeight />
    </>
  );
}