"use client"; // ✅ Add this at the top

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if there is a valid token or session stored
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    // If no token is found, redirect to the login page
    if (!token) {
      router.push("/login"); // Redirect to login page
    }
  }, [router]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
      <h1 className="text-3xl">🎮 Welcome to the Player Dashboard</h1>
      
      <Link href="/player-tournaments">
        <button className="bg-blue-500 px-4 py-2 rounded mt-4 hover:bg-blue-700">
          Show Tournaments
        </button>
      </Link>

      <Link href="/logout">
        <button className="bg-red-500 px-4 py-2 rounded mt-4 hover:bg-red-700">
          Logout
        </button>
      </Link>
    </div>
  );
}
