import React, { useRef, useState } from "react";
import { useLanguage } from "@/hooks/shared/useLanguage";

/**
 * UILanguageSwitcher
 *
 * Dropdown untuk switch bahasa EN / ID.
 * Pilihan disimpan otomatis ke localStorage via i18next-browser-languagedetector.
 *
 * @example
 * <UILanguageSwitcher />
 */
const UILanguageSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { currentOption, languages, switchLanguage, isActive } = useLanguage();

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{currentOption.flag}</span>
        <span className="font-medium">{currentOption.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div
            role="listbox"
            className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1.5 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                role="option"
                aria-selected={isActive(lang.code)}
                onClick={() => {
                  switchLanguage(lang.code);
                  setOpen(false);
                }}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors
                  ${isActive(lang.code)
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span>{lang.label}</span>
                {isActive(lang.code) && (
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-blue-600 flex-shrink-0"
                    fill="currentColor" viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UILanguageSwitcher;