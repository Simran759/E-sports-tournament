"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ShowPage() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tournament/show");
      setTournaments(response.data);
    } catch (err) {
      setError("Failed to fetch tournaments.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    if (!searchQuery) return true;
    const value = tournament[searchFilter]?.toString().toLowerCase() || "";
    return value.includes(searchQuery.toLowerCase());
  });

  if (loading) return <p className="text-center text-white">Loading tournaments...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="flex flex-col items-center min-h-screen relative overflow-hidden bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/19381.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Animated Title */}
      <motion.h1
        className="text-6xl mt-18 font-bold text-center relative z-10 mb-15"
        style={{
          fontFamily: "'Press Start 2P', cursive",
          color: "white",
          textShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        TOURNAMENT LIST
      </motion.h1>

      {/* 🔍 Search Bar & Dropdown */}
      <div className="flex justify-center items-center space-x-4 my-8 relative z-10">
        <input
          type="text"
          placeholder={`Search by ${searchFilter}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-80 border rounded bg-gray-900 text-white placeholder-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        />
        <select
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="px-4 py-2 border rounded bg-gray-900 text-white hover:border-red-500 transition"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          <option value="name">Name</option>
          <option value="gameid">Game ID</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* 📋 Transparent Tournament Table */}
      <div className="w-4/5 overflow-hidden rounded-lg shadow-lg relative z-10">
        <table
          className="w-full text-white bg-transparent border-separate border-spacing-y-2"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          <thead>
            <tr className="bg-transparent">
              <th
                className="p-5 text-left border-b border-gray-500"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                Name
              </th>
              <th
                className="p-4 text-left border-b border-gray-500"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                Game ID
              </th>
              <th
                className="p-4 text-left border-b border-gray-500"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                Date
              </th>
              <th
                className="p-4 text-left border-b border-gray-500"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                Status
              </th>
              <th
                className="p-4 text-left border-b border-gray-500"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTournaments.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No tournaments found
                </td>
              </tr>
            ) : (
              filteredTournaments.map((tournament) => (
                <tr key={tournament.id} className="bg-transparent"
                style={{ height: "10px" }}>
                  {/* ✅ No hover effect */}
                  <td className="p-4 border-b border-gray-700">{tournament.name}</td>
                  <td className="p-4 border-b border-gray-700">{tournament.gameid}</td>
                  <td className="p-4 border-b border-gray-700">
                    {new Date(tournament.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-4 font-bold border-b border-gray-700 ${getStatusColor(
                      tournament.status
                    )}`}
                  >
                    {tournament.status}
                  </td>
                  <td className="p-4 border-b border-gray-700">
                    <motion.button
                      onClick={() => router.push(`/tournamentdetailsadmin/${tournament.id}`)}
                      className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontFamily: "'Press Start 2P', cursive" }}
                    >
                      VIEW
                    </motion.button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ✅ Get status color dynamically
const getStatusColor = (status: string) => {
  switch (status) {
    case "Upcoming":
      return "text-blue-400";
    case "Ongoing":
      return "text-yellow-400";
    case "Completed":
      return "text-green-400";
    default:
      return "text-white";
  }
};
