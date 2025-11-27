import Link from "next/link";
import { User } from "lucide-react";
import { useAuthStore } from "@/src/stores/authStore";

interface Props {
  authOpen: boolean;
  setAuthOpen: (x: boolean | ((p: boolean) => boolean)) => void;
  setLangOpen: (x: boolean) => void;
  currentLang: string;
  authRef: React.RefObject<HTMLDivElement | null>;
}

export default function AuthMenu({
  authOpen,
  setAuthOpen,
  setLangOpen,
  currentLang,
  authRef,
}: Props) {
  const { isAuthenticated, user, logout } = useAuthStore();

  if (isAuthenticated) {
    return (
      <div className="relative" ref={authRef}>
        <button
          type="button"
          onClick={() => {
            setAuthOpen((p) => !p);
            setLangOpen(false);
          }}
          className="flex cursor-pointer items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-xs sm:text-sm p-1.5 sm:px-2 hover:bg-gray-100"
        >
          <User size={20} />
          <span className="hidden sm:inline ml-1 font-medium text-gray-700">
            {user?.name?.split(" ")[0] ?? "Profile"}
          </span>
        </button>

        {authOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-[#ddd] rounded z-50 py-1">
            <Link
              href={`/${currentLang}/buyer/profile`}
              className="block px-3 py-2 text-sm hover:bg-gray-100"
              onClick={() => setAuthOpen(false)}
            >
              My Account
            </Link>
            <button
              onClick={() => {
                void logout();
                setAuthOpen(false);
              }}
              className="w-full cursor-pointer text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  // Not authenticated
  return (
    <div className="relative" ref={authRef}>
      <button
        type="button"
        onClick={() => {
          setAuthOpen((p) => !p);
          setLangOpen(false);
        }}
        className="relative cursor-pointer flex items-center justify-center rounded-sm border border-[#7C3BED] bg-[#7C3BED] text-white text-xs sm:text-sm px-1.5 sm:px-3 py-1 hover:bg-white hover:text-[#7C3BED] transition-all"
      >
        <User className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:inline">Login / Register</span>
      </button>

      {authOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-[#ddd] rounded z-50 py-1">
          <Link
            href={`/${currentLang}/auth/login`}
            className="block px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => setAuthOpen(false)}
          >
            Login
          </Link>
          <Link
            href={`/${currentLang}/auth/register`}
            className="block px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => setAuthOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
