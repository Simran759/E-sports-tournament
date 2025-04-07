"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PlayerTournaments() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    if (storedUser) {
      setUserName(storedUser);
    }
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/player-tournaments`, {
        params: { search: searchQuery, searchBy }
      });
      setTournaments(response.data);
      setFilteredTournaments(response.data);
    } catch (err) {
      setError("Failed to fetch tournaments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = tournaments.filter((tournament) => {
      const query = searchQuery.toLowerCase();
      if (searchBy === "name") {
        return tournament.name?.toLowerCase().includes(query);
      } else if (searchBy === "gameid") {
        return tournament.gameid?.toString().includes(query);
      } else if (searchBy === "status") {
        return tournament.status?.toLowerCase().includes(query);
      }
      return false;
    });
    setFilteredTournaments(filtered);
  }, [searchQuery, searchBy, tournaments]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
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
        TOURNAMENTS
      </motion.h1>

      {/* 🔍 Search Bar & Dropdown */}
      <div className="flex justify-center items-center space-x-4 my-8 relative z-10">
        <input
          type="text"
          placeholder={`Search by ${searchBy}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-80 border rounded bg-gray-900 text-white placeholder-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        />
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
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
              <th className="p-5 text-left border-b border-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                NAME
              </th>
              <th className="p-4 text-left border-b border-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                GAME ID
              </th>
              <th className="p-4 text-left border-b border-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                DATE
              </th>
              <th className="p-4 text-left border-b border-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                STATUS
              </th>
              <th className="p-4 text-left border-b border-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                ACTIONS
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
                <tr key={tournament.id} className="bg-transparent" style={{ height: "10px" }}>
                  
                  {/* Uppercase Tournament Name */}
                  <td className="p-4 border-b border-gray-700 uppercase">{tournament.name}</td>

                  <td className="p-4 border-b border-gray-700">{tournament.gameid}</td>
                  <td className="p-4 border-b border-gray-700">
                    {new Date(tournament.date).toLocaleDateString()}
                  </td>

                  {/* Uppercase Status */}
                  <td
                    className={`p-4 font-bold border-b border-gray-700 uppercase ${getStatusColor(tournament.status)}`}
                  >
                    {tournament.status}
                  </td>

                  <td className="p-4 border-b border-gray-700 flex gap-2">
                    {tournament.status === "Upcoming" || tournament.status === "Ongoing" ? (
                      <motion.button
                        onClick={() => router.push(`/enter-tournament/${tournament.id}`)}
                        className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-gray-900 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ fontFamily: "'Press Start 2P', cursive" }}
                      >
                        ENTER
                      </motion.button>
                    ) : tournament.status === "Completed" ? (
                      <motion.button
                        onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
                        className="bg-green-700 text-white px-3 py-1 rounded hover:bg-gray-900 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ fontFamily: "'Press Start 2P', cursive" }}
                      >
                        VIEW RESULTS
                      </motion.button>
                    ) : null}
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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "upcoming":
      return "text-blue-400";
    case "ongoing":
      return "text-yellow-400";
    case "completed":
      return "text-green-400";
    default:
      return "text-white";
  }
};
