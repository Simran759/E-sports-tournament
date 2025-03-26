"use client";
import React, { useState, useEffect } from "react"; // <-- This import is necessary for JSX
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// Define the type for the team
type Team = {
  id: number;
  teamcode: string;
  playerusername: string;
  tournamentid: number;
  score: number;
};

type GroupedTeam = {
  teamcode: string;
  total_score: number;
  players: Team[];
};

export default function TournamentDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [tournamentName, setTournamentName] = useState("");
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [teams, setTeams] = useState<GroupedTeam[]>([]);
  const [isTeamsLoading, setTeamsLoading] = useState(false);

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
      setDate(date.split("T")[0]); // Format date for input field
      if (status === "Ongoing" ) {
        fetchTeams(); // Fetch teams if tournament is live
      }
    } catch (err) {
      console.error("Failed to load tournament details:", err);
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    setTeamsLoading(true); // Start loading teams
    try {
      const response = await axios.get(`http://localhost:5000/tournament/${id}/teams`);
      console.log("Received teams data:", response.data.teams); // Log the data to see the structure
      setTeams(response.data.teams);
    } catch (err) {
      console.error("Failed to load teams:", err);
      setError("Failed to load teams.");
    } finally {
      setTeamsLoading(false); // Stop loading teams
    }
  };

  useEffect(() => {
    console.log("Teams state updated:", teams);
  }, [teams]);

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
    <h1 className="text-3xl">🎮 Welcome to the {tournamentName}</h1>
    <h6 className="text-1xl">Date: {date}</h6>
    <h6 className="text-1xl">Status: {status}</h6>
  
    {(status === "Ongoing"  ) && (
      <>
        <h2 className="text-xl mt-4 font-bold text-green-500">Tournament is Live! 🎮</h2>
        <p className="text-lg text-yellow-300">Here are the teams for this tournament:</p>
  
        <div className="mt-4 p-4 bg-gray-800 rounded shadow-md w-full overflow-x-auto">
          <h3 className="text-lg font-semibold">Leaderboard:</h3>
  
          {isTeamsLoading ? (
            <p className="text-center text-white">Loading teams...</p>
          ) : teams && teams.length > 0 ? (
            <table className="min-w-full table-auto border-separate border-spacing-2">
              <thead>
                <tr className="bg-gray-600">
                  <th className="p-2 text-lg font-semibold text-center text-white">Rank</th>
                  <th className="p-2 text-lg font-semibold text-center text-white">Team Code</th>
                  <th className="p-2 text-lg font-semibold text-center text-white">Player Name</th>
                  <th className="p-2 text-lg font-semibold text-center text-white">Score</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, teamIndex) => (
                  <React.Fragment key={`${team.teamcode}-${teamIndex}`}>
                    <tr className="bg-gray-600">
                      <td colSpan={4} className="p-3 text-center text-white">
                        <strong>Team: {team.teamcode} (Total Score: {team.total_score})</strong>
                      </td>
                    </tr>
                    {team.players.map((player) => (
                      <tr key={player.playerusername} className="bg-gray-700 border-b-2 border-gray-500">
                        <td className="p-3 text-center text-white">{teamIndex + 1}</td>
                        <td className="p-3 text-center text-white">{team.teamcode}</td>
                        <td className="p-3 text-center text-white">{player.playerusername}</td>
                        <td className="p-3 text-center text-white">{player.score}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No teams available yet.</p>
          )}
        </div>
      </>
    )}
  
    {status !== "Ongoing" && (
      <h2 className="text-xl mt-4 font-bold text-yellow-500">Tournament is not live yet!</h2>
    )}
  </div>  
  );
}
