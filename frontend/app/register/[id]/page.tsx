"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
const baseurl=process.env.NEXT_PUBLIC_API_BASE_URL
export default function RegisterTournament() {
  const router = useRouter();
  const { id } = useParams();
  
  const [tournamentName, setTournamentName] = useState("");
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [teamCode, setTeamCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    if (!userName) {
      router.push("/signup");
      return;
    }

    setUserName(userName);

    if (id) {
      fetchTournamentDetails();
    }
  }, [id]);

  const fetchTournamentDetails = async () => {
    try {
      const response = await axios.get(`${baseurl}/tournament/${id}`);
      const { name, date } = response.data;

      setTournamentName(name);
      setStatus("Upcoming");
      setDate(date.split("T")[0]);
    } catch (err) {
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e:any) => {
    e.preventDefault();
    try {
      const payload = { teamCode, username };
      await axios.post(`${baseurl}/player-tournaments/register/${id}`, payload);
  
      alert("Registration successful ✅");
      router.push("/player-tournaments");
    } catch (error: any) {  // 👈 Explicitly define error as "any"
      console.error("Registration error:", error);
  
      if (error.response && error.response.data) {
        alert(error.response.data.error || "An error occurred ❌");
      } else {
        alert("A network error occurred ❌");
      }
    }
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
        className="relative z-10 w-full max-w-2xl p-10 space-y-8 rounded-xl bg-transparent shadow-2xl bg-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <h1
          className="text-5xl font-bold text-center uppercase mb-18"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            color: "white",
            textShadow: "0 0 15px rgba(255, 0, 0, 0.8)"
          }}
        >
          {tournamentName}
        </h1>

        <p className="text-center text-1xl mb-2 text-gray-300" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          Date: {date}
        </p>

        <p
          className={`text-center text-1xl font-bold ${
            status === "Ongoing" ? "text-green-400" : "text-yellow-400"
          }`}
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Status: {status}
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col space-y-6">
          <input
            className="p-4 text-med rounded-lg text-black text-center placeholder-gray-500 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            placeholder="Enter Team Code"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            required
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          />

          <motion.button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-black font-bold hover:bg-gray-700 hover:text-yellow-300 transition-all shadow-lg"
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
