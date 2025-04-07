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
  const [userRegistered, setUserRegistered] = useState(false);

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
      checkUserRegistration();
    } catch (err) {
      console.error("Failed to load tournament details:", err);
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  const checkUserRegistration = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/player-tournaments/${id}/check-registration`,
        { params: { username } }
      );
      setUserRegistered(response.data.isRegistered);
    } catch (err) {
      console.error("Failed to check user registration:", err);
    }
  };

  const handleRegister = () => {
    router.push(`/register/${id}`);
  };

  const handleJoinTeam = () => {
    router.push(`/join/${id}`);
  };

  const handleMatchWiseLeaderboard = () => {
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      <motion.div
        className="relative z-10 w-full max-w-4xl shadow-xl p-10 space-y-6 rounded-2xl bg-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Tournament Header */}
        <h1
          className="text-5xl font-bold text-center uppercase mb-10"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            color: "white",
            textShadow: "0 0 15px rgba(255, 0, 0, 0.8)"
          }}
        >
          {tournamentName}
        </h1>

        <p
          className="text-center text-1xl mb-2 text-gray-300"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Date: {date}
        </p>

        <p
          className={`text-center text-1xl mb-12 font-bold ${
            status === "Ongoing" ? "text-green-400" : "text-yellow-400"
          }`}
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Status: {status}
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center space-y-8 mt-10 w-full">
          {status === "Ongoing" ? (
            <div className="flex flex-row gap-6 w-full">
              <motion.button
                onClick={handleMatchWiseLeaderboard}
                className="flex-1 px-8 py-4 bg-blue-700 rounded-2xl text-xl font-bold hover:bg-gray-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                MATCH-WISE LEADERBOARD
              </motion.button>

              <motion.button
                onClick={handleOverallLeaderboard}
                className="flex-1 px-8 py-4 bg-blue-700 rounded-2xl text-xl font-bold hover:bg-gray-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                OVERALL LEADERBOARD
              </motion.button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full">
              <motion.div
                className={`text-3xl text-center font-bold cursor-pointer transition-all ${
                  userRegistered
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-red-500 hover:text-yellow-300"
                }`}
                onClick={!userRegistered ? handleRegister : undefined}
                whileTap={!userRegistered ? { scale: 0.95 } : {}}
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                REGISTER TEAM
              </motion.div>

              <motion.div
                className={`text-3xl text-center font-bold cursor-pointer transition-all ${
                  userRegistered
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-red-500 hover:text-yellow-300"
                }`}
                onClick={!userRegistered ? handleJoinTeam : undefined}
                whileTap={!userRegistered ? { scale: 0.95 } : {}}
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                JOIN TEAM
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
