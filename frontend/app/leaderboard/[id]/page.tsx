"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function TournamentDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [tournamentName, setTournamentName] = useState("");
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    if (!storedUserName) {
      router.push("/signup");
      return;
    }
    setUserName(storedUserName);
  }, []);

  useEffect(() => {
    if (username && id) {
      fetchTournamentDetails();
    }
  }, [username, id]);

  const fetchTournamentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tournament/${id}`);
      const { name, date, status } = response.data;
      setTournamentName(name);
      setStatus(status);
      setDate(date.split("T")[0]);
    } catch (err) {
      console.error("Failed to load tournament details:", err);
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  const handleRespectiveMatchesLeaderboard = () => {
    router.push(`/matches/${id}`);
  };

  const handleOverallLeaderboard = () => {
    router.push(`/overall/${id}`);
  };

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/19381.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      <motion.div
        className="relative z-10 w-full max-w-4xl rounded-2xl shadow-xl p-8 space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Tournament Title */}
        <h1
          className="text-6xl font-bold text-center uppercase mt-8 mb-12"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            color: "white",
            textShadow: "0 0 15px rgba(255, 0, 0, 0.8)"
          }}
        >
          {tournamentName}
        </h1>

        {/* Tournament Details */}
        <p
          className="text-center text-1xl mb-2 text-gray-300"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          <span className="font-semibold">Date:</span> {date}
        </p>

        <p
          className="text-center text-1xl mt-1 font-semibold text-yellow-400"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Status: {status}
        </p>

        {/* LEADERBOARD OPTIONS Heading */}
        <motion.h2
          className="text-lg font-bold text-white text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Press Start 2P', cursive"
          }}
        >
          LEADERBOARD OPTIONS
        </motion.h2>

        {/* Leaderboard Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <motion.button
            onClick={handleRespectiveMatchesLeaderboard}
            className="w-full md:w-1/2 px-5 py-3 bg-blue-700 rounded-xl text-lg font-bold hover:bg-gray-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            MATCH-WISE
          </motion.button>

          <motion.button
            onClick={handleOverallLeaderboard}
            className="w-full md:w-1/2 px-5 py-3 bg-blue-700 rounded-xl text-lg font-bold hover:bg-gray-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            OVERALL
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
