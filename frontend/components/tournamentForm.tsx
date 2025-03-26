"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateTournament() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [gameID, setGameID] = useState("");
  const [date, setDate] = useState("");
  // const [status, setStatus] = useState<"Upcoming" | "Ongoing" | "Completed">("Upcoming");
  const [ownerUsername, setOwnerUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
    // console.log("Retrieved username:", username); // Debugging
    if (!username) {
      router.push("/signup"); // Redirect if not authenticated
    } else {
      setOwnerUsername(username);
    }
  }, []);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    //   const token = localStorage.getItem("token");
   
      const payload = { name, gameID, date,  ownerUsername };
      const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
    
      if (date < today) {
        alert("Please select a future date for the tournament! ❌");
        return;
      }
      // const check = await pool.query('SELECT GameID FROM Tournaments WHERE GameID = $1', [gameID]);
      // if (check.rows.length > 0) {  // Fixing condition
      //     return res.status(400).json({ error: 'This game ID is already present. Use a different one.' });
      // }
      await axios.post("http://localhost:5000/tournament/create", payload);

      alert("Tournament added successfully ✅");
      router.push("/tournament");
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to create tournament ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Create Tournament</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-gray-900 p-6 rounded-lg shadow-lg w-96">
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

      {/* /* <select
          className="p-2 text-black"
          value={status}
          onChange={(e) => setStatus(e.target.value as "Ongoing" | "Upcoming" | "Completed")}
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option> */}
        {/* </select> */ }
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Create Tournament</button>
      </form>
    </div>
  );
}
