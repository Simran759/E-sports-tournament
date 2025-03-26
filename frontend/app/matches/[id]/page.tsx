"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

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
  
  // Specify that `matches` is an array of `Match` objects
  const [matches, setMatches] = useState<Match[]>([]); // Store matches data
  const [isMatchesLoading, setMatchesLoading] = useState(false); // Track matches loading state

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
      if (status === "Ongoing") {
        fetchMatches(); // Fetch matches if tournament is live
      }
    } catch (err) {
      console.error("Failed to load tournament details:", err);
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    setMatchesLoading(true); // Start loading matches
    try {
      const response = await axios.get(`http://localhost:5000/tournament/${id}/matches`);
      console.log("Fetched matches:", response.data.matches);
      setMatches(response.data.matches); // Store matches data
    } catch (err) {
      console.error("Failed to load matches:", err);
      setError("Failed to load matches.");
    } finally {
      setMatchesLoading(false); // Stop loading matches
    }
  };

  useEffect(() => {
    console.log("Matches state updated:", matches);
  }, [matches]);

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
      <h1 className="text-3xl">🎮 Welcome to the {tournamentName}</h1>
      <h6 className="text-1xl">Date: {date}</h6>
      <h6 className="text-1xl">Status: {status}</h6>

      {status === "Ongoing" && (
        <>
          <h2 className="text-xl mt-4 font-bold text-green-500">Tournament is Live! 🎮</h2>
          <p className="text-lg text-yellow-300">Here are the matches for this tournament:</p>

          <div className="mt-4 p-4 bg-gray-800 rounded shadow-md w-full overflow-x-auto">
            <h3 className="text-lg font-semibold">Matches:</h3>

            {isMatchesLoading ? (
              <p className="text-center text-white">Loading matches...</p>
            ) : matches && matches.length > 0 ? (
              <table className="min-w-full table-auto border-separate border-spacing-2">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="p-2 text-lg font-semibold text-center text-white">Match #</th>
                    <th className="p-2 text-lg font-semibold text-center text-white">Player 1</th>
                    <th className="p-2 text-lg font-semibold text-center text-white">Player 2</th>
                    <th className="p-2 text-lg font-semibold text-center text-white">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match, index) => (
                    <tr key={index} className="bg-gray-700 border-b-2 border-gray-500">
                      <td className="p-3 text-center text-white">{index + 1}</td>
                      <td className="p-3 text-center text-white">{match?.player1username || "N/A"}</td>
                      <td className="p-3 text-center text-white">{match?.player2username || "N/A"}</td>
                      <td className="p-3 text-center text-white">{match?.winnerusername || "TBD"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No matches available yet.</p>
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
