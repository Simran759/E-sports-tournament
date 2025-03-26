"use client"; // ✅ Add this at the top

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Clear token or session storage if used
    localStorage.clear();// Remove token if stored
    sessionStorage.clear();

    // Redirect to login page after logout
    router.push("/");
  }, []);

  return <div>Logging out...</div>;
}
