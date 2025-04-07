// // "use client";
// // import { useState, useEffect } from "react";
// // import { useRouter, useParams } from "next/navigation";
// // import axios from "axios";

// // export default function TournamentDetails() {
// //   const router = useRouter();
// //   const { id } = useParams();
// //   const [tournament, setTournament] = useState<any>(null);
// //   const [players, setPlayers] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
// //   const isAdmin = userName === tournament?.ownerusername;

// //   useEffect(() => {
// //     if (id) fetchTournamentDetails();
// //   }, [id]);

// //   const fetchTournamentDetails = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:5000/tournament/${id}`);
// //       console.log("API Response:", response.data);
// //       setTournament(response.data);
// //       setPlayers(response.data.players || []);
// //     } catch (err) {
// //       console.error("Error fetching tournament:", err);
// //       setError("Failed to fetch tournament details.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!confirm("Are you sure you want to delete this tournament?")) return;
// //     try {
// //       await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
// //       alert("Tournament deleted successfully ✅");
// //       router.push("/");
// //     } catch (error) {
// //       alert("Failed to delete tournament ❌");
// //     }
// //   };

// //   const handleScheduleMatches = async (id: number) => {
// //     if (!confirm("Are you sure you want to schedule matches?")) return;

// //     try {
// //       await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
// //       alert("Matches scheduled successfully ✅");
// //     } catch (error: any) {
// //       if (error.response && error.response.data && error.response.data.error) {
// //         alert(error.response.data.error);
// //       } else {
// //         alert("Failed to schedule matches ❌");
// //       }
// //     }
// //   };

// //   if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
// //   if (error) return <p className="text-center text-red-500">{error}</p>;

// //   return (
// //     <div
// //       className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
// //       style={{ backgroundImage: "url('/19381.jpg')" }}
// //     >
// //       {/* 🔥 Darker Overlay */}
// //       <div className="absolute inset-0 bg-black/80 z-10"></div>

// //       {/* Tournament Title */}
// //       <h2
// //         className="relative mt-2 z-20 text-5xl font-bold uppercase tracking-widest text-center mb-8"
// //         style={{
// //           fontFamily: "'Press Start 2P', cursive",
// //           color: "white",
// //           textShadow: "0 0 15px rgba(255, 0, 0, 0.8)", // Stronger glow effect
// //         }}
// //       >
// //         {tournament?.name}
// //       </h2>

// //       {/* 📋 Players Table */}
// //       <div className="relative z-20 w-full max-w-5xl">
// //         {players.length === 0 ? (
// //           <p className="text-center text-gray-400 text-2xl">No players registered.</p>
// //         ) : (
// //           <table className="w-full text-white text-center border-collapse">
// //             <thead>
// //               <tr className="bg-gray-700">
// //                 <th
// //                   className="py-2 px-4 text-2xl"
// //                   style={{ fontFamily: "'Press Start 2P', cursive" }}
// //                 >
// //                   S. no.
// //                 </th>
// //                 <th
// //                   className="py-2 px-4 text-2xl"
// //                   style={{ fontFamily: "'Press Start 2P', cursive" }}
// //                 >
// //                   Username
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {players.map((player, index) => (
// //                 <tr
// //                   key={index}
// //                   className="border-b border-gray-600 transition duration-300"
// //                   style={{ height: "50px" }} // Smaller row height
// //                 >
// //                   <td className="py-2 px-6 text-xl">{index + 1}</td>
// //                   <td
// //                     className="py-2 px-6 text-2xl uppercase font-bold tracking-wide"
// //                     style={{ fontFamily: "Rajdhani, sans-serif" }}
// //                   >
// //                     {player.username}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>

// //       {/* 🔹 Admin Actions (Text Links) */}
// //       {isAdmin && (
// //         <div className="relative z-20 mt-12 flex flex-col items-center gap-4 text-white">
// //           {tournament?.status?.toLowerCase() === "upcoming" && (
// //             <>
// //               <a
// //                 onClick={() => router.push(`/edit/${id}`)}
// //                 className="text-2xl cursor-pointer hover:text-yellow-400 transition duration-300"
// //                 style={{ fontFamily: "'Press Start 2P', cursive" }}
// //               >
// //                 Edit
// //               </a>
// //               <a
// //                 onClick={handleDelete}
// //                 className="text-2xl cursor-pointer hover:text-yellow-400 transition duration-300"
// //                 style={{ fontFamily: "'Press Start 2P', cursive" }}
// //               >
// //                 Delete
// //               </a>
// //               <a
// //                 onClick={() => handleScheduleMatches(tournament.id)}
// //                 className={`text-2xl cursor-pointer hover:text-yellow-400 transition duration-300 ${
// //                   tournament.scheduling
// //                     ? "text-gray-500 cursor-not-allowed"
// //                     : "hover:text-green-500"
// //                 }`}
// //                 style={{ fontFamily: "'Press Start 2P', cursive" }}
// //               >
// //                 {tournament.scheduling ? "Scheduling..." : "Schedule Matches"}
// //               </a>
// //             </>
// //           )}
// //         </div>
// //       )}

// //       {/* ✨ Bright Text Styling */}
// //       <style jsx>{`
// //         h2, th, td {
// //           color: #fff !important;
// //           filter: brightness(2);
// //           text-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
// //         }

// //         tr:hover {
// //           filter: brightness(1.3);
// //           transition: all 0.3s ease-in-out;
// //         }

// //         a {
// //           text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
// //           transition: color 0.3s;
// //         }

// //         a:hover {
// //           filter: brightness(2.5);
// //           transform: scale(1.1);
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import axios from "axios";

// export default function TournamentDetails() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [tournament, setTournament] = useState<any>(null);
//   const [players, setPlayers] = useState<any[]>([]);
//   const [matches, setMatches] = useState<any[]>([]);
//   const [leaderboard, setLeaderboard] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const userName =
//     typeof window !== "undefined" ? localStorage.getItem("userName") : null;
//   const isAdmin = userName === tournament?.ownerusername;

//   useEffect(() => {
//     if (id) fetchTournamentDetails();
//   }, [id]);

//   const fetchTournamentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/tournament/${id}`);
//       setTournament(response.data);
//       setPlayers(response.data.players || []);

//       // Fetch leaderboard only if ongoing or completed
//       if (["ongoing", "completed"].includes(response.data.status.toLowerCase())) {
//         fetchLeaderboard();
//       }
//     } catch (err) {
//       setError("Failed to fetch tournament details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLeaderboard = async () => {
//     try {
//       router.push(`/leaderboard/${id}`);
//       // setLeaderboard(response.data || []);
//     } catch (err) {
//       console.error("Error fetching leaderboard:", err);
//     }
//   };

//   const fetchMatches = async () => {
//     try {
//       // const response = await axios.get(`http://localhost:5000/tournament/${id}/matches`);
//       // setMatches(response.data || []);
//       router.push(`/matches/${id}`)
//     } catch (err) {
//       console.error("Error fetching matches:", err);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this tournament?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
//       alert("Tournament deleted successfully ✅");
//       router.push("/");
//     } catch (error) {
//       alert("Failed to delete tournament ❌");
//     }
//   };

//   const handleScheduleMatches = async () => {
//     if (!confirm("Are you sure you want to schedule matches?")) return;
//     try {
//       await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
//       alert("Matches scheduled successfully ✅");
//     } catch (error) {
//       alert("Failed to schedule matches ❌");
//     }
//   };

//   if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div
//       className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
//       style={{ backgroundImage: "url('/19381.jpg')" }}
//     >
//       {/* 🔥 Darker Overlay */}
//       <div className="absolute inset-0 bg-black/80 z-10"></div>

//       {/* Tournament Title */}
//       <h2
//         className="relative mt-2 z-20 text-5xl font-bold uppercase tracking-widest text-center mb-8"
//         style={{
//           fontFamily: "'Press Start 2P', cursive",
//           color: "white",
//           textShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
//         }}
//       >
//         {tournament?.name}
//       </h2>

//       {/* 📋 Players Table */}
//       <div className="relative z-20 w-full max-w-5xl">
//         {players.length === 0 ? (
//           <p className="text-center text-gray-400 text-2xl">No players registered.</p>
//         ) : (
//           <table className="w-full text-white text-center border-collapse">
//             <thead>
//               <tr className="bg-gray-700">
//                 <th className="py-2 px-4 text-2xl" style={{ fontFamily: "'Press Start 2P', cursive" }}>
//                   S. no.
//                 </th>
//                 <th className="py-2 px-4 text-2xl" style={{ fontFamily: "'Press Start 2P', cursive" }}>
//                   Username
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {players.map((player, index) => (
//                 <tr key={index} className="border-b border-gray-600 transition duration-300">
//                   <td className="py-2 px-6 text-xl">{index + 1}</td>
//                   <td className="py-2 px-6 text-2xl uppercase font-bold tracking-wide" style={{ fontFamily: "Rajdhani, sans-serif" }}>
//                     {player.username}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* 🎮 Matches & Leaderboard Section (For Everyone) */}
//       {tournament?.status?.toLowerCase() === "ongoing" && (
//         <div className="relative z-20 mt-12 text-white text-center">
//           <button
//             onClick={fetchMatches}
//             className="text-2xl cursor-pointer hover:text-yellow-400 transition duration-300 px-6 py-2 bg-gray-800 rounded-lg"
//             style={{ fontFamily: "'Press Start 2P', cursive" }}
//           >
//             Show Matches
//           </button>

//           {matches.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-3xl font-bold mb-4">Matches</h3>
//               <ul>
//                 {matches.map((match, index) => (
//                   <li key={index} className="text-xl">{`${match.player1} vs ${match.player2}`}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       {(tournament?.status?.toLowerCase() === "ongoing" ||
//         tournament?.status?.toLowerCase() === "completed") && (
//         <div className="relative z-20 mt-8 text-white text-center">
//           <h3 className="text-3xl font-bold">Leaderboard</h3>
//           {leaderboard.length > 0 ? (
//             <ul className="mt-4">
//               {leaderboard.map((player, index) => (
//                 <li key={index} className="text-xl">{`${index + 1}. ${player.username} - ${player.points} pts`}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-xl">No leaderboard data available.</p>
//           )}
//         </div>
//       )}

//       {/* 🔹 Admin Controls (Only for Admins) */}
//       {isAdmin && tournament?.status?.toLowerCase() === "upcoming" && (
//         <div className="relative z-20 mt-12 flex flex-col items-center gap-4 text-white">
//           <a onClick={() => router.push(`/edit/${id}`)} className="text-2xl cursor-pointer hover:text-yellow-400">
//             Edit
//           </a>
//           <a onClick={handleDelete} className="text-2xl cursor-pointer hover:text-red-400">
//             Delete
//           </a>
//           <a onClick={handleScheduleMatches} className="text-2xl cursor-pointer hover:text-green-400">
//             Schedule Matches
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function TournamentDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [tournament, setTournament] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userName =
    typeof window !== "undefined" ? localStorage.getItem("userName") : null;
  const isAdmin = userName === tournament?.ownerusername;

  useEffect(() => {
    if (id) fetchTournamentDetails();
  }, [id]);

  const fetchTournamentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tournament/${id}`);
      setTournament(response.data);
      setPlayers(response.data.players || []);
    } catch (err: any) {
      const message = err.response?.data?.error || "Failed to fetch tournament details.";
      console.log(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchLeaderboard = () => {
    router.push(`/leaderboard/${id}`);
  };
  const fetchLeaderboardt = () => {
    router.push(`/complete-leaderboard/${id}`);
  };

  const fetchMatches = () => {
    router.push(`/dynamic-matches/${id}`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tournament?")) return;
    try {
      await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
      alert("Tournament deleted successfully ✅");
      router.push("/show");
    } catch (err: any) {
      const message = err.response?.data?.error || "Failed to delete tournament ❌";
      alert(message);
    }
  };
  

  const handleScheduleMatches = async () => {
    if (!confirm("Are you sure you want to schedule matches?")) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/tournament/schedule-matches/${id}`
      );
      alert("Matches scheduled successfully ✅");
    } catch (err: any) {
      const message = err.response?.data?.error || "Failed to schedule matches ❌";
      alert(message);
    }
  };
  
  

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/19381.jpg')" }}>
      <div className="absolute inset-0 bg-black/80 z-10"></div>

      <h2 className="relative mt-2 z-20 text-6xl font-bold uppercase tracking-widest text-center mb-18" style={{ fontFamily: "'Press Start 2P', cursive", color: "white", textShadow: "0 0 15px rgba(255, 0, 0, 0.8)" }}>
        {tournament?.name}
      </h2>

      {isAdmin && tournament?.status?.toLowerCase() === "ongoing" && (
  <button 
    onClick={fetchMatches} 
    className="relative z-20 text-2xl cursor-pointer px-6 py-2 rounded-lg transition duration-300 group"
    style={{ fontFamily: "'Press Start 2P', cursive" }}
  >
    <span className="text-red-500 group-hover:text-yellow-400 transition duration-300">
      SHOW MATCHES
    </span>
  </button>
)}

{tournament?.status?.toLowerCase() === "ongoing" && (
  <button 
    onClick={fetchLeaderboard} 
    className="relative z-20 mt-2 text-2xl cursor-pointer px-6 py-2 rounded-lg transition duration-300 group"
    style={{ fontFamily: "'Press Start 2P', cursive" }}
  >
    <span className="text-red-500 group-hover:text-yellow-400 transition duration-300 mb-10">
      SHOW LEADERBOARD
    </span>
  </button>
)}

      
      {(tournament?.status?.toLowerCase() === "completed") && (
  <div className="relative z-20 mt-6 flex flex-col items-center gap-4 text-red-500"> 
    <button 
      onClick={fetchLeaderboardt} 
      className="text-3xl text-red-500 hover:text-gray-700 transition-colors duration-200"
      style={{ fontFamily: "'Press Start 2P', cursive" }}
    >
      SHOW LEADERBOARD
    </button>
  </div>
)}

      {(isAdmin && tournament?.status?.toLowerCase() != "upcoming" &&
        <div className="relative z-20 mt-6 flex flex-col items-center gap-4 text-white"> 
          <a onClick={handleDelete} className="text-2xl cursor-pointer hover:text-gray-700 mt-8"
          style={{ fontFamily: "'Press Start 2P', cursive"}}>DELETE</a> 
        </div>
      )}
      {isAdmin && tournament?.status?.toLowerCase() === "upcoming" && (
        <div className="relative z-20 mt-12 flex flex-col items-center gap-4 text-red-500">
          <a onClick={() => router.push(`/edit/${id}`)} className="text-2xl cursor-pointer hover:text-yellow-400"
            style={{ fontFamily: "'Press Start 2P', cursive"}}>EDIT</a>
          <a onClick={handleScheduleMatches} className="text-2xl cursor-pointer hover:text-yellow-400 mb-10"
          style={{ fontFamily: "'Press Start 2P', cursive"}}>SCHEDULE MATCHES</a>
          <a onClick={handleDelete} className="text-2xl cursor-pointer text-white hover:text-gray-700"
          style={{ fontFamily: "'Press Start 2P', cursive"}}>DELETE</a>
        </div>
      )}
    </div>
  );
}
