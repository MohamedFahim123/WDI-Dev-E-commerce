import { languages } from "@/src/i18n/settings";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction } from "react";

interface LangDropDownInterface {
  langRef: RefObject<HTMLDivElement | null>;
  currentLang: string;
  setLangOpen: Dispatch<SetStateAction<boolean>>;
  setAuthOpen: Dispatch<SetStateAction<boolean>>;
  langOpen: boolean;
  getPathForLang: (x: string) => string;
}

export default function LangDropDown({
  langRef,
  currentLang,
  setLangOpen,
  setAuthOpen,
  langOpen,
  getPathForLang,
}: LangDropDownInterface) {
  return (
    <div className="relative" ref={langRef}>
      <button
        name={currentLang}
        title={currentLang}
        type="button"
        onClick={() => {
          setLangOpen((p) => !p);
          setAuthOpen(false);
        }}
        className="border border-[#ddd] px-2 sm:px-2 py-1 rounded text-xs sm:text-sm font-medium flex items-center gap-1 bg-white min-w-[45px] sm:min-w-[54px] sm:min-w-[60px]"
      >
        {currentLang.toUpperCase()}
        <ChevronDown size={16} className="hidden sm:inline-block" />
      </button>
      {langOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border border-[#ddd] rounded z-50 py-1">
          {languages.map((lang) => (
            <Link
              title={lang.name}
              key={lang.code}
              href={getPathForLang(lang.code)}
              className="block px-3 py-2 text-sm hover:bg-gray-100"
              onClick={() => setLangOpen(false)}
            >
              {lang.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
