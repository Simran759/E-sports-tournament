"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
const baseurl=process.env.NEXT_PUBLIC_API_BASE_URL
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
      const response = await axios.get(`${baseurl}/tournament/${id}`);
      const { name, date, status } = response.data;
      console.log("Username set from localStorage:", username);
      setTournamentName(name);
      setStatus(status);
      setDate(date.split("T")[0]); // Format date for input fiel// Ensure username is passed
    } catch (err) {
      console.error("Failed to load tournament details:", err);
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

 

  const handleShowMatches = () => {
    router.push(`/dynamic-matches/${id}`);
  };

  const handleLeaderboard = () => {
    router.push(`/leaderboard/${id}`);
  };

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
      <h1 className="text-3xl">🎮 Welcome to the {tournamentName}</h1>
      <h6 className="text-1xl">Date: {date}</h6>
      <h6 className="text-1xl">Status: {status}</h6>

      {/* Show leaderboard or ongoing tournament info if the tournament is ongoing */}
      {status === "Ongoing" && (
        <>
          <h2 className="text-xl mt-4 font-bold text-green-500">Tournament is Ongoing</h2>
          
          <button
            onClick={handleLeaderboard}
            className={'px-3 py-1 rounded mt-4 bg-green-400 cursor-allowed'}
          >
            Leaderboard
          </button>
          <button
            onClick={handleShowMatches}
            className={'px-3 py-1 rounded mt-4 bg-blue-400 cursor-allowed'}
          >
            Show Matches
          </button>
        </>
      )}

      {/* If the tournament is not ongoing, provide options to show leaderboard */}
      {status !== "Ongoing" && (
        <>
          <button
            onClick={handleLeaderboard}
            className="px-3 py-1 rounded mt-4 bg-green-400 cursor-allowed"
          >
            Leaderboard
          </button>
          <button
            onClick={handleShowMatches}
            className="px-3 py-1 rounded mt-4 bg-blue-400 cursor-allowed"
          >
            Show Matches
          </button>
        </>
      )}
    </div>
  );
}
