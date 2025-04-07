"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
const baseurl=process.env.NEXT_PUBLIC_API_BASE_URL
// Define the type for the match
type Match = {
  id: number;
  tournamentid: number;
  player1username: string;
  player2username: string;
  winnerusername: string | null; // Winner could be null
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
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [isMatchesLoading, setMatchesLoading] = useState(false);

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
        fetchMatches();
      }
    } catch (err) {
      console.error("Failed to load tournament details:", err);
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    setMatchesLoading(true);
    try {
      const response = await axios.get(`${baseurl}/tournament/${id}/matches`);
      setMatches(response.data.matches);
    } catch (err) {
      console.error("Failed to load matches:", err);
      setError("Failed to load matches.");
    } finally {
      setMatchesLoading(false);
    }
  };

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/19381.jpg')" }}
    >
      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      <div className="relative z-10 w-full max-w-5xl shadow-2xl p-8 space-y-8">
        {/* Tournament Header */}
        <h1
          className="text-4xl font-bold text-center uppercase"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            color: "white",
            textShadow: "0 0 15px rgba(255, 0, 0, 0.8)"
          }}
        >
          {tournamentName}
        </h1>

        <p className="text-center text-lg mb-2 text-gray-300" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          Date: {date}
        </p>

        <p
          className={`text-center text-lg font-bold ${
            status === "Ongoing" ? "text-yellow-400" : "text-red-400"
          }`}
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Status: {status}
        </p>

        {/* Matches Section */}
        {status === "Ongoing" && (
          <>
            <p
              className="text-center text-yellow-300 text-lg"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              MATCHES:
            </p>

            {isMatchesLoading ? (
              <p className="text-center text-white">Loading matches...</p>
            ) : matches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto rounded-lg shadow-lg">
                  <thead>
                    <tr className="text-white text-center bg-gray-900">
                      <th className="p-4 font-bold border-b border-gray-500"
                      style={{ fontFamily: "'Press Start 2P', cursive" }}>Match #</th>
                      <th className="p-4 font-bold border-b border-gray-500"
                      style={{ fontFamily: "'Press Start 2P', cursive" }}>Player I</th>
                      <th className="p-4 font-bold border-b border-gray-500"
                      style={{ fontFamily: "'Press Start 2P', cursive" }}>Player II</th>
                      <th className="p-4 font-bold border-b border-gray-500"
                      style={{ fontFamily: "'Press Start 2P', cursive" }}>Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-600 bg-gray-800 hover:bg-gray-700 transition duration-200"
                      >
                        <td className="p-4 text-center"
                        style={{ fontFamily: "Rajdhani, sans-serif" }}>{index + 1}</td>
                        <td className="p-4 text-center"
                        style={{ fontFamily: "Rajdhani, sans-serif" }}>{match.player1username || "N/A"}</td>
                        <td className="p-4 text-center"
                        style={{ fontFamily: "Rajdhani, sans-serif" }}>{match.player2username || "N/A"}</td>
                        <td className="p-4 text-center"
                        style={{ fontFamily: "Rajdhani, sans-serif" }}>{match.winnerusername || "TBD"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-white"
              style={{ fontFamily: "Rajdhani, sans-serif" }}>NO MATCHES AVAILABLE</p>
            )}
          </>
        )}

        {status !== "Ongoing" && (
          <h2 className="text-xl mt-4 font-bold text-yellow-500 text-center" 
          style={{ fontFamily: "'Press Start 2P', cursive" }}>
            Tournament is not live yet!
          </h2>
        )}
      </div>
    </div>
  );
}
