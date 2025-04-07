"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditTournament() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [gameID, setGameID] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!username) {
      router.push("/signup");
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
      const { name, gameid, date } = response.data;

      setName(name ?? "");  // Fallback to empty string
      setGameID(gameid ?? "");  // Fallback to empty string
      setDate(date?.split("T")[0] ?? "");  // Fallback to empty string
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
      const formattedToday = today.toISOString().split("T")[0];

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
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/19381.jpg')" }}
    >
      {/* 🔥 Darker Overlay */}
      <div className="absolute inset-0 bg-black/90 z-10"></div>

      {/* 📝 Transparent Edit Form */}
      <form
        onSubmit={handleUpdate}
        className="relative z-20 flex flex-col gap-5 p-10 rounded-xl w-full max-w-lg"
        style={{ backgroundColor: "transparent" }}
      >
        <input
          className="w-full p-4 text-xl text-white border border-white/30 bg-transparent rounded-lg text-center outline-none transition-shadow"
          type="text"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
          placeholder="Tournament Name"
          value={name ?? ""}  // Fallback to empty string
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-4 text-xl border border-white/30 text-white bg-transparent rounded-lg text-center outline-none transition-shadow"
          type="number"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
          placeholder="Game ID"
          value={gameID ?? ""}  // Fallback to empty string
          onChange={(e) => setGameID(e.target.value)}
          required
        />
        <input
          className="w-full p-4 text-xl text-white border border-white/30 bg-transparent rounded-lg outline-none text-center  transition-shadow"
          type="date"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
          value={date ?? ""}  // Fallback to empty string
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-700 text-2xl text-white py-3 rounded-lg hover:scale-105 transition-transform hover:bg-gray-900"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          Update
        </button>
      </form>

      {/* ✨ Consistent Glow Effects */}
      <style jsx>{`
        h2 {
          color: #fff;
          filter: brightness(1.8);
          text-shadow: 0 0 30px rgba(185, 196, 196, 0.9);
        }

        form {
          transition: box-shadow 0.3s ease-in-out;
        }

        input, button {
          transition: all 0.3s ease-in-out;
        }

        button:hover {
          filter: brightness(1.5);
          box-shadow: 0 0 25px rgba(22, 44, 62, 0.9);
        }
      `}</style>
    </div>
  );
}
