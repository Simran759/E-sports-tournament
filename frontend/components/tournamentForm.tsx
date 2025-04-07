"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateTournament() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [gameID, setGameID] = useState("");
  const [date, setDate] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    if (!username) {
      router.push("/signup");
    } else {
      setOwnerUsername(username);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { name, gameID, date, ownerUsername };
      const today = new Date().toISOString().split("T")[0];

      if (date < today) {
        alert("Please select a future date for the tournament! ❌");
        return;
      }

      await axios.post("http://localhost:5000/tournament/create", payload);
      alert("Tournament added successfully ✅");
      router.push("/admin-dashboard");
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to create tournament ❌");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/19381.jpg')" }}
    >
      <div className="relative w-full max-w-lg">
        
        {/* ✅ Form without visual block */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-transparent"
        >
          <input
            className="p-3 border border-white/30 bg-transparent rounded-lg text-white placeholder-gray-400 text-center focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
            placeholder="Tournament Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="p-3 border border-white/30 bg-transparent rounded-lg text-white placeholder-gray-400 text-center focus:outline-none focus:ring-2 focus:ring-red-500"
            type="number"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
            placeholder="Game ID"
            value={gameID}
            onChange={(e) => setGameID(e.target.value)}
            required
          />

<input
  className="p-3 border border-white/30 bg-transparent rounded-lg text-white placeholder-gray-400 text-center focus:outline-none focus:ring-2 focus:ring-red-500 accent-red-600"
  type="date"
  style={{ fontFamily: "Rajdhani, sans-serif" }}
  value={date}
  onChange={(e) => setDate(e.target.value)}
  required
/>


          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
