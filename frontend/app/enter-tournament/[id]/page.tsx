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
  const [userRegistered, setUserRegistered] = useState(false);

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
      console.log("Username set from localStorage:", username);
      setTournamentName(name);
      setStatus(status);
      setDate(date.split("T")[0]); // Format date for input field
      checkUserRegistration(); // Ensure username is passed
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
  const handleStatus=()=>
  {
    router.push(`/leaderboard/${id}`);
  }

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
          <p className="text-lg text-yellow-300">Check out the live leaderboard!</p>
          {/* Add a placeholder for leaderboard */}
          {/* <div className="mt-4 p-4 bg-gray-800 rounded shadow-md">
            <h3 className="text-lg font-semibold">Leaderboard</h3>
            <p className="text-sm">Top 5 players:</p>
            {/* You can add a table or list here displaying live leaderboard data */}
            {/* <ul className="text-sm">
              <li>1. Player1 - 500 points</li>
              <li>2. Player2 - 450 points</li>
              <li>3. Player3 - 420 points</li>
              <li>4. Player4 - 380 points</li>
              <li>5. Player5 - 350 points</li>
            </ul>
          </div> */}
          <button
            onClick={handleStatus}
            className={'px-3 py-1 rounded mt-4 bg-green-400 cursor-allowed'}
            
          >
            Leaderboard
          </button> 
        </>
      )}

      {/* Hide Register and Join buttons if the tournament is ongoing */}
      {status !== "Ongoing" && (
        <>
          <button
            onClick={handleRegister}
            className={`px-3 py-1 rounded mt-4 ${userRegistered ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}
            disabled={userRegistered}
          >
            Register
          </button>
          <button
            onClick={handleJoinTeam}
            className={`px-3 py-1 rounded mt-4 ${userRegistered ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}
            disabled={userRegistered}
          >
            Join Team
          </button>
        </>
      )}
    </div>
  );
}
