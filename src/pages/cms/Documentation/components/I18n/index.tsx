import { useTranslation } from "react-i18next";
import UILanguageSwitcher from "@/components/shared/molecules/UILanguageSwitcher";

export default function DocI18n() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">i18n Demo</h1>
        <UILanguageSwitcher />
      </div>

      {/* ── 1. Teks biasa ─────────────────────────────────────────────────── */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          1. Teks Biasa
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {[
            { key: "nav.home" },
            { key: "nav.users" },
            { key: "action.save" },
            { key: "action.delete" },
            { key: "status.active" },
            { key: "status.empty" },
          ].map(({ key }) => (
            <div key={key} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <code className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                t("{key}")
              </code>
              <span className="font-medium text-gray-800">{t(key)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Interpolasi ────────────────────────────────────────────────── */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          2. Interpolasi ({"{{name}}"})
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          <div className="flex items-center justify-between px-4 py-2.5 text-sm">
            <code className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
              t("greeting.hello", {"{{ name: 'Budi' }}"})</code>
            <span className="font-medium text-gray-800">
              {t("greeting.hello", { name: "Budi" })}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 text-sm">
            <code className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
              t("greeting.welcome", {"{{ name: 'Alice' }}"})</code>
            <span className="font-medium text-gray-800">
              {t("greeting.welcome", { name: "Alice" })}
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. Plural ─────────────────────────────────────────────────────── */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          3. Plural (count)
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {[1, 2, 5, 100].map((count) => (
            <div key={count} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <code className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                t("item_count", {"{{ count: "}{count}{" }}"})</code>
              <span className="font-medium text-gray-800">
                {t("item_count", { count })}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Language Switcher ──────────────────────────────────────────── */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          4. Language Switcher
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <UILanguageSwitcher />
          <p className="text-sm text-gray-500">
            Pilihan disimpan ke <code className="bg-gray-100 px-1 rounded text-xs">localStorage</code>,
            persist setelah refresh.
          </p>
        </div>
      </section>

    </div>
  );
}