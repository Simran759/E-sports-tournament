"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-semibold mb-6">Handle Tournaments</h1>

      <div className="flex gap-4">
          <button
            onClick={() => router.push("/create")}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded"
          >
            Create Tournaments
          </button>
          <button
            onClick={() => router.push("/show")}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded"
          >
            Show Tournaments
          </button>
        </div>
    </div>
  );
}
