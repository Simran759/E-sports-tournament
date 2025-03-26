"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function JoinTournament() {
  const router = useRouter();
  const { id } = useParams();

  const [tournamentName, setTournamentName] = useState("");
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [teamCode, setTeamCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [teamExists, setTeamExists] = useState(false); // Check if team exists

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    const token=localStorage.getItem("token");
    if(!token)
    {
      router.push("/login");
      return;
    }
    if (!storedUser) {
      router.push("/signup"); // Redirect if not authenticated
      return;
    }
    setUserName(storedUser);
    if (id) {
      fetchTournamentDetails();
    }
  }, [id]);

  const fetchTournamentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tournament/${id}`);
      const { name, date } = response.data;
      setTournamentName(name);
      setStatus("Upcoming");
      setDate(date.split("T")[0]); // Format date for input
    } catch (err) {
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

//   const checkTeamExists = async (teamCode: string) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/teams/${teamCode}`);
//       if (response.data) {
//         setTeamExists(true);
//       } else {
//         setTeamExists(false);
//       }
//     } catch (error) {
//       setTeamExists(false);
//     }
//   };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!teamExists) {
    //   alert("Invalid Team Code ❌. Please enter a valid team.");
    //   return;
    // }
    try {
      const payload = { teamCode, username };
      await axios.post(`http://localhost:5000/player-tournaments/join/${id}`, payload);
      alert("Successfully joined the team ✅");
      router.push("/player-tournaments");
    } catch (error: any) {
      alert(error.response?.data?.error || "An error occurred ❌");
    }
  };

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Join Tournament</h2>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <p className="text-lg mb-2"><strong>Name:</strong> {tournamentName}</p>
        <p className="text-lg mb-2"><strong>Date:</strong> {date}</p>
        <p className="text-lg mb-4"><strong>Status:</strong> {status}</p>
        <form onSubmit={handleJoin} className="flex flex-col gap-3">
          <input
            className="p-2 text-black rounded"
            type="text"
            placeholder="Enter Existing Team Code"
            value={teamCode}
            onChange={(e) => {
              setTeamCode(e.target.value);
          
            }}
            required
          />
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Join</button>
        </form>
      </div>
    </div>
  );
}
