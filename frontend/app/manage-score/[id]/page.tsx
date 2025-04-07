/*"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

interface ScoreFormProps {
  matchId: number;
}

export default function ScoreForm({ matchId }: ScoreFormProps) {
  const router = useRouter();
  const { id } = useParams();
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [score1, setScore1] = useState<number | string>("");
  const [score2, setScore2] = useState<number | string>("");
  const [tournamentId, setTournamentId] = useState<string>(""); // Add tournament ID state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Fetch match details based on matchId and update player1 and player2
  useEffect(() => {
    const token=localStorage.getItem("token");
    if(!token)
    {
      router.push("/login");
      return;
    }
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/matches/${id}`);
        const { player1username, player2username } = response.data;
        setPlayer1(player1username);
        setPlayer2(player2username);
      } catch (err) {
        setError("Failed to fetch match details.");
      }
    };

    const storedTournamentId = localStorage.getItem("TournamentId");
    console.log(storedTournamentId); // Get Tournament ID from localStorage
    if (storedTournamentId) {
      setTournamentId(storedTournamentId); // Set Tournament ID state
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
        matchId:id,
        player1score: score1,
        player2score: score2,
        tournamentId:tournamentId, // Include the tournamentId in the payload
        player1username: player1,
        player2username: player2,
      };

      await axios.put("http://localhost:5000/matches/score", payload);
      alert("Score updated successfully ✅");
      router.push(`/dynamic-matches/${tournamentId}`); // Navigate back to tournament details page after score is updated
    } catch (error: any) {
      setError("Failed to update scores.");
      console.error("Error updating scores:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen from-gray-900 to-black text-black relative">
      {/* Glassmorphism Form Container *//*
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-lg bg-black/5 p-8 rounded-lg shadow-lg w-80 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Manage Score for Match</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Player 1 Username *//*
          <div>
            <label className="text-lg text-black-100">{player1}</label>
            <input
              className="p-3 bg-black-700 font-mono text-black rounded-md focus:outline-none focus:ring-gray-500 placeholder-black-300 text-center"
              type="number"
              placeholder="Score for Player 1"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              required
            />
          </div>

          {/* Player 2 Username *//*
          <div>
            <label className="text-lg text-black-100">{player2}</label>
            <input
              className="p-3 bg-black-700 font-mono text-black rounded-md focus:outline-none focus:ring-gray-500 placeholder-black-300 text-center"
              type="number"
              placeholder="Score for Player 2"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              required
            />
          </div>

          {/* Error Message *//*
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit Button *//*
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-gray-700 font-mono hover:bg-gray-800 px-6 py-3 text-white rounded-none font-semibold text-lg transition-all"
          >
            {loading ? "Processing..." : "Submit Score"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
*/

"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
const baseurl=process.env.NEXT_PUBLIC_API_BASE_URL
interface ScoreFormProps {
  matchId: number;
}

export default function ScoreForm({ matchId }: ScoreFormProps) {
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
