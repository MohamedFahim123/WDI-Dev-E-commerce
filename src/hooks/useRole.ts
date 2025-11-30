import { getRoleFromCookie } from "@/src/lib/authClient";
import { useEffect, useState } from "react";

export function useRole() {
  const [role, setRole] = useState<"buyer" | "seller" | null>(() =>
    getRoleFromCookie()
  );

  useEffect(() => {
    const id = setInterval(() => {
      const r = getRoleFromCookie();
      if (r !== role) setRole(r);
    }, 500);
    return () => clearInterval(id);
  }, [role]);

  return role;
}
