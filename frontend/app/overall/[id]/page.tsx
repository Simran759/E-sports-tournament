"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
const baseurl=process.env.NEXT_PUBLIC_API_BASE_URL
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
      const response = await axios.get(`${baseurl}/tournament/${id}`);
      const { name, date, status } = response.data;
      setTournamentName(name);
      setStatus(status);
      setDate(date.split("T")[0]);
      if (status === "Ongoing") {
        fetchTeams();
      }
    } catch (err) {
      console.error("Failed to load tournament details:", err);
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    setTeamsLoading(true);
    try {
      const response = await axios.get(`${baseurl}/tournament/${id}/teams`);
      setTeams(response.data.teams);
    } catch (err) {
      console.error("Failed to load teams:", err);
      setError("Failed to load teams.");
    } finally {
      setTeamsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Teams state updated:", teams);
  }, [teams]);

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white relative px-4 py-10"
      style={{ backgroundImage: "url('/19381.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      <div className="relative z-10 text-center mb-2">
        <h1
          className="text-4xl sm:text-5xl font-bold uppercase mb-4"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            color: "white",
            textShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
          }}
        >
           {tournamentName}
        </h1>
        <p
          className="text-base sm:text-lg font-semibold"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Date: {date}
        </p>
        <p
          className={`text-base sm:text-lg font-bold ${
            status === "Ongoing" ? "text-green-400" : "text-yellow-400"
          }`}
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Status: {status}
        </p>
      </div>

      {status === "Ongoing" ? (
        <div className="relative z-10 w-full max-w-6xl p-6 bg-transparent rounded-lg shadow-lg">
          <h2
            className="text-1xl sm:text-2xl font-bold text-green-400 text-center mb-8"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            Tournament is Live!
          </h2>
          <p
            className="text-3xl font-bold text-yellow-300 text-center mb-6"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            LEADERBOARD
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/20">
            <table className="min-w-full text-white table-auto border-separate border-spacing-2">
              <thead>
                <tr className="bg-gray-700">
                  <th
                    className="p-3 text-sm sm:text-base font-semibold text-center"
                    style={{ fontFamily: "'Press Start 2P', cursive" }}
                  >
                    Rank
                  </th>
                  <th
                    className="p-3 text-sm sm:text-base font-semibold text-center"
                    style={{ fontFamily: "'Press Start 2P', cursive" }}
                  >
                    Team Code
                  </th>
                  <th
                    className="p-3 text-sm sm:text-base font-semibold text-center"
                    style={{ fontFamily: "'Press Start 2P', cursive" }}
                  >
                    Player Name
                  </th>
                  <th
                    className="p-3 text-sm sm:text-base font-semibold text-center"
                    style={{ fontFamily: "'Press Start 2P', cursive" }}
                  >
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {isTeamsLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      Loading teams...
                    </td>
                  </tr>
                ) : teams.length > 0 ? (
                  teams.map((team, teamIndex) => (
                    <React.Fragment key={`${team.teamcode}-${teamIndex}`}>
                      <tr className="bg-transparent">
                        <td
                          colSpan={4}
                          className="p-4 text-center font-bold text-red-500 border-b border-gray-700"
                          style={{ fontFamily: "'Press Start 2P', cursive" }}
                        >
                          Team: {team.teamcode} (Total Score: {team.total_score})
                        </td>
                      </tr>
                      {team.players.map((player) => (
                        <tr key={player.playerusername} className="border-b border-gray-700 bg-black/20">
                          <td
                            className="p-3 text-center"
                            style={{ fontFamily: "Rajdhani, sans-serif" }}
                          >
                            {teamIndex + 1}
                          </td>
                          <td
                            className="p-3 text-center"
                            style={{ fontFamily: "Rajdhani, sans-serif" }}
                          >
                            {team.teamcode}
                          </td>
                          <td
                            className="p-3 text-center"
                            style={{ fontFamily: "Rajdhani, sans-serif" }}
                          >
                            {player.playerusername}
                          </td>
                          <td
                            className="p-3 text-center"
                            style={{ fontFamily: "Rajdhani, sans-serif" }}
                          >
                            {player.score}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-300 p-4">
                      No teams available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h2
          className="text-2xl sm:text-3xl font-bold text-yellow-400 mt-6 text-center z-10"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          ⚠️ Tournament is not live yet!
        </h2>
      )}
    </div>
  );
}
