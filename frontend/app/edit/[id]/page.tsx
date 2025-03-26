"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";


import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditTournament() {
  const router = useRouter();
  const { id } = useParams();
 
 
  console.log(id);
  const [name, setName] = useState("");
  const [gameID, setGameID] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const token=localStorage.getItem("token");
    if(!token)
    {
      router.push("/login");
      return;
    }
    if (!username) {
      router.push("/signup"); // Redirect if not authenticated
      return;
    }
    setOwnerUsername(username);

    if (id) {
      fetchTournamentDetails();
    }
  }, [id]);

  const fetchTournamentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tournament/${id}`);
      const { name, gameid, date, ownerusername } = response.data;


      setName(name);
      setGameID(gameid);
      setDate(date.split("T")[0]); // Format date for input field
    } catch (err) {
      setError("Failed to load tournament details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); 
    const formattedToday = today.toISOString().split("T")[0];  // Get today's date
      if (date < formattedToday) {
        alert("Please select a future date! ❌");
        return;
      }

      const payload = { name, gameID, date, ownerUsername };
      await axios.put(`http://localhost:5000/tournament/update/${id}`, payload);

      alert("Tournament updated successfully ✅");
      router.push("/show");
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to update tournament ❌");
    }
  };

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Edit Tournament</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-3 bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <input
          className="p-2 text-black"
          type="text"
          placeholder="Tournament Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="p-2 text-black"
          type="number"
          placeholder="Game ID"
          value={gameID}
          onChange={(e) => setGameID(e.target.value)}
          required
        />
        <input
          className="p-2 text-black"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Update Tournament</button>
      </form>
    </div>
  );
}
