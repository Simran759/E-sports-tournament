"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ScoreForm() {
  const router = useRouter();
  const { id } = useParams();
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [score1, setScore1] = useState<number | string>("");
  const [score2, setScore2] = useState<number | string>("");
  const [tournamentId, setTournamentId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}/matches/${id}`);
        const { player1username, player2username } = response.data;
        setPlayer1(player1username);
        setPlayer2(player2username);
      } catch (err) {
        setError("Failed to fetch match details.");
      }
    };

    const storedTournamentId = localStorage.getItem("TournamentId");
    if (storedTournamentId) {
      setTournamentId(storedTournamentId);
    }

    fetchMatchDetails();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (score1 === "" || score2 === "") {
      setError("Both scores are required.");
      return;
    }

    if (!tournamentId) {
      setError("Tournament ID is missing.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        matchId: id,
        player1score: score1,
        player2score: score2,
        tournamentId,
        player1username: player1,
        player2username: player2,
      };

      await axios.put(`${baseurl}/matches/score`, payload);
      alert("Score updated successfully ✅");
      router.push(`/dynamic-matches/${tournamentId}`);
    } catch (error: any) {
      setError("Failed to update scores.");
      console.error("Error updating scores:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/19381.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 backdrop-blur-lg bg-black/40 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2
          className="text-2xl text-center mb-6"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            textShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
          }}
        >
          MANAGE SCORE
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              className="block mb-2 text-center"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              {player1}
            </label>
            <input
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-center"
              type="number"
              placeholder="Score for Player 1"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              required
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            />
          </div>

          <div>
            <label
              className="block mb-2 text-center"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              {player2}
            </label>
            <input
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-center"
              type="number"
              placeholder="Score for Player 2"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              required
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            />
          </div>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold transition-all duration-200"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            {loading ? "Submitting..." : "Submit Score"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
