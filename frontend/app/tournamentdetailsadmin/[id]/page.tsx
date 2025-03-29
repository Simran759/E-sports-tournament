// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import axios from "axios";

// export default function TournamentDetails() {
//   const router = useRouter();
//   const { id } = useParams(); // Get tournament ID from URL
//   const [tournament, setTournament] = useState<any>(null);
//   const [players, setPlayers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchTournamentDetails();
//   }, []);

//   const fetchTournamentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/tournament/${id}`);
//       console.log("API Response:", response.data); // ✅ Debugging
//       setTournament(response.data);
//       setPlayers(response.data.players || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch tournament details.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this tournament?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
//       alert("Tournament deleted successfully ✅");
//       router.push("/"); // Redirect to homepage after deletion
//     } catch (error) {
//       alert("Failed to delete tournament ❌");
//     }
//   };
//   const handleScheduleMatches = async () => {
//     if (!confirm("Are you sure you want to schedule matches?")) return;
//     try {
//       const response = await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
//       console.log("Response:", response.data);
//       alert("Matches scheduled successfully ✅");
//     } catch (error: unknown) {
//         console.error("Error scheduling matches:", error);
      
//         let errorMessage = "An unknown error occurred ❌";
//         if (error instanceof Error) {
//           errorMessage = error.message;
//         } else if (axios.isAxiosError(error)) {
//           errorMessage = error.response?.data?.error || "Server error occurred ❌";
//         }
      
//         alert(`Failed to schedule matches ❌\n${errorMessage}`);
//       }
      
//   };
  

//   if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
//       <h2 className="text-3xl mb-4">{tournament?.name} - Details</h2>

//       {/* 📋 Players List */}
// <h3 className="text-xl mb-2">Registered Players</h3>
// <ul className="bg-gray-900 p-4 rounded-lg shadow-lg w-96">
//   {players.length === 0 ? (
//     <p className="text-gray-400">No players registered.</p>
//   ) : (
//     players.map((player, index) => (
//       <li key={index} className="p-2 border-b border-gray-700 flex justify-between">
//         <span className="font-semibold">{player.username}</span>
//         <span className="text-gray-400">Team: {player.teamcode}</span>
//       </li>
//     ))
//   )}
// </ul>


//       {/* 🔹 Admin Actions */}
//       {localStorage.getItem("userName") === tournament.ownerusername && (
//         <div className="mt-6 flex gap-3">
//           <button
//             onClick={() => router.push(`/edit/${id}`)}
//             className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete
//           </button>
//           <button
//             onClick={handleScheduleMatches}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Schedule Matches
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import axios from "axios";

// export default function TournamentDetails() {
//   const router = useRouter();
//   const { id } = useParams(); // Get tournament ID from URL
//   const [tournament, setTournament] = useState<any>(null);
//   const [players, setPlayers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchTournamentDetails();
//   }, []);

//   const fetchTournamentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/tournament/${id}`);
//       console.log("API Response:", response.data); // ✅ Debugging
//       setTournament(response.data);
//       setPlayers(response.data.players || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch tournament details.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this tournament?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
//       alert("Tournament deleted successfully ✅");
//       router.push("/"); // Redirect to homepage after deletion
//     } catch (error) {
//       alert("Failed to delete tournament ❌");
//     }
//   };

//   const handleScheduleMatches = async () => {
//     if (!confirm("Are you sure you want to schedule matches?")) return;
//     try {
//       const response = await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
//       console.log("Response:", response.data);
//       alert("Matches scheduled successfully ✅");
//     } catch (error: unknown) {
//       console.error("Error scheduling matches:", error);
    
//       let errorMessage = "An unknown error occurred ❌";
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       } else if (axios.isAxiosError(error)) {
//         errorMessage = error.response?.data?.error || "Server error occurred ❌";
//       }
    
//       alert(`Failed to schedule matches ❌\n${errorMessage}`);
//     }
//   };

//   if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
//       <h2 className="text-3xl mb-4">{tournament?.name} - Details</h2>

//       {/* 📋 Players List */}
//       <h3 className="text-xl mb-2">Registered Players</h3>
//       <ul className="bg-gray-900 p-4 rounded-lg shadow-lg w-96">
//         {players.length === 0 ? (
//           <p className="text-gray-400">No players registered.</p>
//         ) : (
//           players.map((player, index) => (
//             <li key={index} className="p-2 border-b border-gray-700 flex justify-between">
//               <span className="font-semibold">{player.username}</span>
//               <span className="text-gray-400">Team: {player.teamcode}</span>
//             </li>
//           ))
//         )}
//       </ul>

//       {/* 🔹 Tournament Status Actions */}
//       <div className="mt-6">
//         {tournament.status === "Upcoming" && (
//           <button
//             onClick={handleScheduleMatches}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Schedule Matches
//           </button>
//         )}

//         {tournament.status === "Ongoing" && (
//           <button
//             onClick={() => router.push(`/manage/${tournament.id}`)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Manage Tournament
//           </button>
//         )}

//         {tournament.status === "Completed" && (
//           <button
//             onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             View Results
//           </button>
//         )}
//       </div>

//       {/* 🔹 Admin Actions (Only for Owner) */}
//       {localStorage.getItem("userName") === tournament.ownerusername && (
//         <div className="mt-6 flex gap-3">
//           <button
//             onClick={() => router.push(`/edit/${id}`)}
//             className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import axios from "axios";

// export default function TournamentDetails() {
//   const router = useRouter();
//   const { id } = useParams(); // Get tournament ID from URL
//   const [tournament, setTournament] = useState<any>(null);
//   const [players, setPlayers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch tournament details when ID changes
//   useEffect(() => {
//     if (id) fetchTournamentDetails();
//   }, [id]);

//   const fetchTournamentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/tournament/${id}`);
//       console.log("API Response:", response.data);
//       setTournament(response.data);
//       setPlayers(response.data.players || []);
//     } catch (err) {
//       console.error("Error fetching tournament:", err);
//       setError("Failed to fetch tournament details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Tournament
//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this tournament?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
//       alert("Tournament deleted successfully ✅");
//       router.push("/"); // Redirect to homepage
//     } catch (error) {
//       alert("Failed to delete tournament ❌");
//     }
//   };

//   // Schedule Matches
//   const handleScheduleMatches = async () => {
//     if (!confirm("Are you sure you want to schedule matches?")) return;
//     try {
//       const response = await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
//       console.log("Matches Scheduled:", response.data);
//       alert("Matches scheduled successfully ✅");
//       fetchTournamentDetails(); // Refresh data after scheduling
//     } catch (error) {
//       console.error("Error scheduling matches:", error);
//       alert("Failed to schedule matches ❌");
//     }
//   };

//   if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
//       <h2 className="text-3xl mb-4">{tournament?.name} - Details</h2>

//       {/* 📋 Players List */}
//       <h3 className="text-xl mb-2">Registered Players</h3>
//       <ul className="bg-gray-900 p-4 rounded-lg shadow-lg w-96">
//         {players.length === 0 ? (
//           <p className="text-gray-400">No players registered.</p>
//         ) : (
//           players.map((player, index) => (
//             <li key={index} className="p-2 border-b border-gray-700 flex justify-between">
//               <span className="font-semibold">{player.username}</span>
//               <span className="text-gray-400">Team: {player.teamcode}</span>
//             </li>
//           ))
//         )}
//       </ul>
        
//       {/* 🔹 Tournament Status Actions */}
//       <div className="mt-6">
//         {tournament?.status?.toLowerCase() === "upcoming" && (
//           <button
//             onClick={handleScheduleMatches}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Schedule Matches
//           </button>
//         )}

//         {tournament?.status?.toLowerCase() === "ongoing" && (
//           <button
//             onClick={() => router.push(`/manage/${tournament.id}`)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Manage Tournament
//           </button>
//         )}

//         {tournament?.status?.toLowerCase() === "completed" && (
//           <button
//             onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             View Results
//           </button>
//         )}
//       </div>

//       {/* 🔹 Admin Actions (Only for Owner) */}
//       {localStorage.getItem("userName") === tournament?.ownerusername && (
//         <div className="mt-6 flex gap-3">
//           <button
//             onClick={() => router.push(`/edit/${id}`)}
//             className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete
//           </button>
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
  const { id } = useParams(); // Get tournament ID from URL
  const [tournament, setTournament] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
  const isAdmin = userName === tournament?.ownerusername; // Check if user is admin

  // Fetch tournament details when ID changes
  useEffect(() => {
    if (id) fetchTournamentDetails();
  }, [id]);

  const fetchTournamentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tournament/${id}`);
      console.log("API Response:", response.data);
      setTournament(response.data);
      setPlayers(response.data.players || []);
    } catch (err) {
      console.error("Error fetching tournament:", err);
      setError("Failed to fetch tournament details.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Tournament (Admin Only)
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tournament?")) return;
    try {
      await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
      alert("Tournament deleted successfully ✅");
      router.push("/"); // Redirect to homepage
    } catch (error) {
      alert("Failed to delete tournament ❌");
    }
  };

  const handleScheduleMatches = async (id: number) => {
        if (!confirm("Are you sure you want to schedule matches?")) return;
      
        try {
          // Send a request to the backend to schedule matches
          await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
          alert("Matches scheduled successfully ✅");
        } catch (error:any) {
          // Check if it's a response error from the backend
          if (error.response && error.response.data && error.response.data.error) {
            // Display the error message in a pop-up alert
            alert(error.response.data.error);
          } else {
            // Fallback in case of other errors
            alert("Failed to schedule matches ❌");
          }
        }
      };

  if (loading) return <p className="text-center text-white">Loading tournament details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-3xl mb-4">{tournament?.name} - Details</h2>

      {/* 📋 Players List */}
      <h3 className="text-xl mb-2">Registered Players</h3>
      <ul className="bg-gray-900 p-4 rounded-lg shadow-lg w-96">
        {players.length === 0 ? (
          <p className="text-gray-400">No players registered.</p>
        ) : (
          players.map((player, index) => (
            <li key={index} className="p-2 border-b border-gray-700 flex justify-between">
              <span className="font-semibold">{player.username}</span>
              <span className="text-gray-400">Team: {player.teamcode}</span>
            </li>
          ))
        )}
      </ul>

      {/* 🔹 Tournament Status Actions */}
      <div className="mt-6">
        {tournament.status === "Completed" && (
          <button
            onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Results
          </button>
        )}
      </div>

      {/* 🔹 Admin Actions */}
      {isAdmin && (
        <div className="mt-6 flex flex-col gap-3">
          {tournament?.status?.toLowerCase() === "upcoming" && (
            <>
              <button
                onClick={() => router.push(`/edit/${id}`)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
             
                         <button
                          onClick={() => handleScheduleMatches(tournament.id)}
                         
                          className={`px-3 py-1 rounded ${
                            tournament.scheduling
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-700"
                          }`}
                        >
                          {tournament.scheduling ? "Scheduling..." : "Schedule Matches"}
                        </button>
                      
            </>
          )}

          {tournament?.status?.toLowerCase() === "ongoing" && (
            <>
             
              <button
                onClick={() => router.push(`/manage/${tournament.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Manage Tournament
              </button>
            
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
