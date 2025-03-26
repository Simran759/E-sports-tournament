"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

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
    const token=localStorage.getItem("token");
    if(!token)
    {
      router.push("/login");
      return;
    }
    if (!storedUserName) {
      router.push("/signup"); // Redirect if not authenticated
      return;
    }
    setUserName(storedUserName); // Set username
  }, []);

  // Now, only call fetchTournamentDetails when username is set
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
      setDate(date.split("T")[0]); // Format date for input field
    } catch (err) {
      console.error("Failed to load tournament details:", err);
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  // Handlers for the leaderboard buttons
  const handleRespectiveMatchesLeaderboard = () => {
    router.push(`/matches/${id}`); // Navigate to respective matches leaderboard
  };

  const handleOverallLeaderboard = () => {
    router.push(`/overall/${id}`); // Navigate to overall leaderboard
  };

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
      <h1 className="text-3xl">🎮 Welcome to the {tournamentName}</h1>
      <h6 className="text-1xl">Date: {date}</h6>
      <h6 className="text-1xl">Status: {status}</h6>

      
        <>
          <h2 className="text-xl mt-4 font-bold text-green-500">Tournament is Live! 🎮</h2>
          <p className="text-lg text-yellow-300">Check out the live leaderboard!</p>

          {/* Buttons for viewing leaderboards */}
          <button
            onClick={handleRespectiveMatchesLeaderboard}
            className="px-3 py-1 rounded mt-4 bg-red-500 hover:bg-red-700"
          >
            View Respective Matches Leaderboard
          </button>

          <button
            onClick={handleOverallLeaderboard}
            className="px-3 py-1 rounded mt-4 bg-blue-500 hover:bg-blue-700"
          >
            View Overall Leaderboard
          </button>
        </>
      

   
     
    </div>
  );
}
