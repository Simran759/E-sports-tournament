// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function ShowPage() {
//   const router = useRouter();
//   const [tournaments, setTournaments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const token=localStorage.getItem("token");
//     if(!token)
//     {
//       router.push("/login");
//       return;
//     }
//     fetchTournaments();
//   }, []);

//   const fetchTournaments = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/tournament/show");
//       setTournaments(response.data);
//     } catch (err) {
//       setError("Failed to fetch tournaments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle Match Scheduling
//   const handleScheduleMatches = async (id: number) => {
//     if (!confirm("Are you sure you want to schedule matches?")) return;
  
//     try {
//       // Send a request to the backend to schedule matches
//       await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
//       alert("Matches scheduled successfully ✅");
//     } catch (error:any) {
//       // Check if it's a response error from the backend
//       if (error.response && error.response.data && error.response.data.error) {
//         // Display the error message in a pop-up alert
//         alert(error.response.data.error);
//       } else {
//         // Fallback in case of other errors
//         alert("Failed to schedule matches ❌");
//       }
//     }
//   };
  

//   // ✅ Handle Delete
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this tournament?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
//       setTournaments(tournaments.filter((t) => t.id !== id));
//       alert("Tournament deleted successfully ✅");
//     } catch (error) {
//       alert("Failed to delete tournament ❌");
//     }
//   };

//   if (loading) return <p className="text-center text-white">Loading tournaments...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
//       <h2 className="text-3xl mb-4">Tournament List</h2>

//       <table className="w-3/4 bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
//         <thead className="bg-gray-700">
//           <tr>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Game ID</th>
//             <th className="p-3 text-left">Date</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tournaments.length === 0 ? (
//             <tr>
//               <td colSpan={5} className="p-3 text-center text-gray-400">
//                 No tournaments found
//               </td>
//             </tr>
//           ) : (
//             tournaments.map((tournament) => (
//               <tr key={tournament.id} className="border-b border-gray-700">
//                 <td className="p-3">{tournament.name}</td>
//                 <td className="p-3">{tournament.gameid}</td>
//                 <td className="p-3">{new Date(tournament.date).toLocaleDateString()}</td>
//                 <td className={`p-3 font-bold ${getStatusColor(tournament.status)}`}>
//                   {tournament.status}
//                 </td>
//                 <td className="p-3 flex gap-2">
//                   {localStorage.getItem("userName") === tournament.ownerusername ? (
//                     <>
//                       {/* ✏️ Edit Button */}
//                       {tournament.status=="Upcoming" &&
//                       <button
//                         onClick={() => router.push(`/edit/${tournament.id}`)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       >
//                         Edit
//                       </button>}
//                       {tournament.status=="Completed" &&
//                       <button
//                         onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       >
//                         view results
//                       </button>}
//                       {tournament.status=="Ongoing" &&
//                       <button
//                         onClick={() => router.push(`/manage/${tournament.id}`)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       >
//                         Manage ongoing Tournament
//                       </button>}
//                       {/* ❌ Delete Button */}
//                       <button
//                         onClick={() => handleDelete(tournament.id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>

//                       {/* 🏆 Schedule Matches Button (Only if Status is Upcoming) */}
//                       {tournament.status === "Upcoming" && (
//                         <button
//                           onClick={() => handleScheduleMatches(tournament.id)}
                         
//                           className={`px-3 py-1 rounded ${
//                             tournament.scheduling
//                               ? "bg-gray-500 cursor-not-allowed"
//                               : "bg-green-500 hover:bg-green-700"
//                           }`}
//                         >
//                           {tournament.scheduling ? "Scheduling..." : "Schedule Matches"}
//                         </button>
//                       )}
//                     </>
//                   ) : (
//                     <span className="text-gray-400 italic">🔒 Not an Admin</span>
//                   )}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // ✅ Get status color dynamically
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "Upcoming":
//       return "text-blue-400";
//     case "Ongoing":
//       return "text-yellow-400";
//     case "Completed":
//       return "text-green-400";
//     default:
//       return "text-white";
//   }
// };


//second comment


// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function ShowPage() {
//   const router = useRouter();
//   const [tournaments, setTournaments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Search State
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFilter, setSearchFilter] = useState("name"); // Default to "name"

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }
//     fetchTournaments();
//   }, [searchQuery, searchFilter]); // Fetch tournaments whenever search changes

//   // ✅ Fetch Tournaments with Search Filter
//   const fetchTournaments = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/tournament/show", {
//         params: { search: searchQuery, filter: searchFilter },
//       });
//       setTournaments(response.data);
//     } catch (err) {
//       setError("Failed to fetch tournaments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle Match Scheduling
//   const handleScheduleMatches = async (id: number) => {
//     if (!confirm("Are you sure you want to schedule matches?")) return;
  
//     try {
//       await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
//       alert("Matches scheduled successfully ✅");
//     } catch (error: any) {
//       if (error.response?.data?.error) {
//         alert(error.response.data.error);
//       } else {
//         alert("Failed to schedule matches ❌");
//       }
//     }
//   };

//   // ✅ Handle Delete
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this tournament?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
//       setTournaments(tournaments.filter((t) => t.id !== id));
//       alert("Tournament deleted successfully ✅");
//     } catch (error) {
//       alert("Failed to delete tournament ❌");
//     }
//   };

//   if (loading) return <p className="text-center text-white">Loading tournaments...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
//       <h2 className="text-3xl mb-4">Tournament List</h2>

//       {/* 🔍 Search Bar & Dropdown */}
//       <div className="flex justify-center items-center space-x-4 my-4">
//         <input
//           type="text"
//           placeholder="Search tournaments..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="px-3 py-2 w-64 border rounded bg-gray-900 text-white"
//         />

//         <select
//           value={searchFilter}
//           onChange={(e) => setSearchFilter(e.target.value)}
//           className="px-3 py-2 border rounded bg-gray-900 text-white"
//         >
//           <option value="name">Name</option>
//           <option value="gameid">Game ID</option>
//           <option value="status">Status</option>
//         </select>
//       </div>

//       {/* 📋 Tournament Table */}
//       <table className="w-3/4 bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
//         <thead className="bg-gray-700">
//           <tr>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Game ID</th>
//             <th className="p-3 text-left">Date</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tournaments.length === 0 ? (
//             <tr>
//               <td colSpan={5} className="p-3 text-center text-gray-400">
//                 No tournaments found
//               </td>
//             </tr>
//           ) : (
//             tournaments.map((tournament) => (
//               <tr key={tournament.id} className="border-b border-gray-700">
//                 <td className="p-3">{tournament.name}</td>
//                 <td className="p-3">{tournament.gameid}</td>
//                 <td className="p-3">{new Date(tournament.date).toLocaleDateString()}</td>
//                 <td className={`p-3 font-bold ${getStatusColor(tournament.status)}`}>
//                   {tournament.status}
//                 </td>
//                 <td className="p-3 flex gap-2">
//                   {localStorage.getItem("userName") === tournament.ownerusername ? (
//                     <>
//                       {tournament.status === "Upcoming" && (
//                         <button
//                           onClick={() => router.push(`/edit/${tournament.id}`)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                         >
//                           Edit
//                         </button>
//                       )}
//                       {tournament.status === "Completed" && (
//                         <button
//                           onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                         >
//                           View Results
//                         </button>
//                       )}
//                       {tournament.status === "Ongoing" && (
//                         <button
//                           onClick={() => router.push(`/manage/${tournament.id}`)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                         >
//                           Manage Tournament
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDelete(tournament.id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                       {tournament.status === "Upcoming" && (
//                         <button
//                           onClick={() => handleScheduleMatches(tournament.id)}
//                           className={`px-3 py-1 rounded ${
//                             tournament.scheduling
//                               ? "bg-gray-500 cursor-not-allowed"
//                               : "bg-green-500 hover:bg-green-700"
//                           }`}
//                         >
//                           {tournament.scheduling ? "Scheduling..." : "Schedule Matches"}
//                         </button>
//                       )}
//                     </>
//                   ) : (
//                     <span className="text-gray-400 italic">Not an Admin</span>
//                   )}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // ✅ Get status color dynamically
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "Upcoming":
//       return "text-blue-400";
//     case "Ongoing":
//       return "text-yellow-400";
//     case "Completed":
//       return "text-green-400";
//     default:
//       return "text-white";
//   }
// };


// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function ShowPage() {
//   const router = useRouter();
//   const [tournaments, setTournaments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [viewingTournamentId, setViewingTournamentId] = useState<number | null>(null); // Track which tournament is being viewed

//   // ✅ Search State
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFilter, setSearchFilter] = useState("name");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }
//     fetchTournaments();
//   }, [searchQuery, searchFilter]);

//   const fetchTournaments = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/tournament/show", {
//         params: { search: searchQuery, filter: searchFilter },
//       });
//       setTournaments(response.data);
//     } catch (err) {
//       setError("Failed to fetch tournaments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScheduleMatches = async (id: number) => {
//     if (!confirm("Are you sure you want to schedule matches?")) return;
//     try {
//       await axios.post(`http://localhost:5000/tournament/schedule-matches/${id}`);
//       alert("Matches scheduled successfully ✅");
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Failed to schedule matches ❌");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this tournament?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/tournament/delete/${id}`);
//       setTournaments(tournaments.filter((t) => t.id !== id));
//       alert("Tournament deleted successfully ✅");
//     } catch (error) {
//       alert("Failed to delete tournament ❌");
//     }
//   };

//   if (loading) return <p className="text-center text-white">Loading tournaments...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
//       <h2 className="text-3xl mb-4">Tournament List</h2>

//       {/* 🔍 Search Bar & Dropdown */}
//       <div className="flex justify-center items-center space-x-4 my-4">
//         <input
//           type="text"
//           placeholder="Search tournaments..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="px-3 py-2 w-64 border rounded bg-gray-900 text-white"
//         />
//         <select
//           value={searchFilter}
//           onChange={(e) => setSearchFilter(e.target.value)}
//           className="px-3 py-2 border rounded bg-gray-900 text-white"
//         >
//           <option value="name">Name</option>
//           <option value="gameid">Game ID</option>
//           <option value="status">Status</option>
//         </select>
//       </div>

//       {/* 📋 Tournament Table */}
//       <table className="w-3/4 bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
//         <thead className="bg-gray-700">
//           <tr>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Game ID</th>
//             <th className="p-3 text-left">Date</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tournaments.length === 0 ? (
//             <tr>
//               <td colSpan={5} className="p-3 text-center text-gray-400">
//                 No tournaments found
//               </td>
//             </tr>
//           ) : (
//             tournaments.map((tournament) => (
//               <tr key={tournament.id} className="border-b border-gray-700">
//                 <td className="p-3">{tournament.name}</td>
//                 <td className="p-3">{tournament.gameid}</td>
//                 <td className="p-3">{new Date(tournament.date).toLocaleDateString()}</td>
//                 <td className={`p-3 font-bold ${getStatusColor(tournament.status)}`}>
//                   {tournament.status}
//                 </td>
//                 <td className="p-3 flex flex-col gap-2">
//                   {/* 🔹 View Button */}
//                   <button
//                     onClick={() =>
//                       setViewingTournamentId(viewingTournamentId === tournament.id ? null : tournament.id)
//                     }
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     {viewingTournamentId === tournament.id ? "Close" : "View"}
//                   </button>

//                   {/* 🔹 Show Admin Actions if "View" is clicked */}
//                   {viewingTournamentId === tournament.id &&
//                     localStorage.getItem("userName") === tournament.ownerusername && (
//                       <>
//                         {tournament.status === "Upcoming" && (
//                           <button
//                             onClick={() => router.push(`/edit/${tournament.id}`)}
//                             className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
//                           >
//                             Edit
//                           </button>
//                         )}
//                         {tournament.status === "Completed" && (
//                           <button
//                             onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
//                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                           >
//                             View Results
//                           </button>
//                         )}
//                         {tournament.status === "Ongoing" && (
//                           <button
//                             onClick={() => router.push(`/manage/${tournament.id}`)}
//                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                           >
//                             Manage Tournament
//                           </button>
//                         )}
//                         <button
//                           onClick={() => handleDelete(tournament.id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
//                         >
//                           Delete
//                         </button>
//                         {tournament.status === "Upcoming" && (
//                           <button
//                             onClick={() => handleScheduleMatches(tournament.id)}
//                             className={`px-3 py-1 rounded ${
//                               tournament.scheduling
//                                 ? "bg-gray-500 cursor-not-allowed"
//                                 : "bg-green-500 hover:bg-green-700"
//                             }`}
//                           >
//                             {tournament.scheduling ? "Scheduling..." : "Schedule Matches"}
//                           </button>
//                         )}
//                       </>
//                     )}
//                   {/* 🔹 If not the admin */}
//                   {localStorage.getItem("userName") !== tournament.ownerusername && (
//                     <span className="text-gray-400 italic">🔒 Not an Admin</span>
//                   )}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // ✅ Get status color dynamically
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "Upcoming":
//       return "text-blue-400";
//     case "Ongoing":
//       return "text-yellow-400";
//     case "Completed":
//       return "text-green-400";
//     default:
//       return "text-white";
//   }
// };

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ShowPage() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name"); // Default to "name"

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tournament/show");
      setTournaments(response.data);
    } catch (err) {
      setError("Failed to fetch tournaments.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter tournaments dynamically based on search query & selected filter
  const filteredTournaments = tournaments.filter((tournament) => {
    if (!searchQuery) return true; // If search is empty, show all
    const value = tournament[searchFilter]?.toString().toLowerCase() || "";
    return value.includes(searchQuery.toLowerCase());
  });

  if (loading) return <p className="text-center text-white">Loading tournaments...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-3xl mb-4">Tournament List</h2>

      {/* 🔍 Search Bar & Dropdown */}
      <div className="flex justify-center items-center space-x-4 my-4">
        <input
          type="text"
          placeholder={`Search by ${searchFilter}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 w-64 border rounded bg-gray-900 text-white"
        />
        <select
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-900 text-white"
        >
          <option value="name">Name</option>
          <option value="gameid">Game ID</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* 📋 Tournament Table */}
      <table className="w-3/4 bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Game ID</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTournaments.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-3 text-center text-gray-400">
                No tournaments found
              </td>
            </tr>
          ) : (
            filteredTournaments.map((tournament) => (
              <tr key={tournament.id} className="border-b border-gray-700">
                <td className="p-3">{tournament.name}</td>
                <td className="p-3">{tournament.gameid}</td>
                <td className="p-3">{new Date(tournament.date).toLocaleDateString()}</td>
                <td className={`p-3 font-bold ${getStatusColor(tournament.status)}`}>
                  {tournament.status}
                </td>
                <td className="p-3">
                  {/* 🔹 View Button (Navigates to Tournament Details Page) */}
                  <button
                    onClick={() => router.push(`/tournamentdetailsadmin/${tournament.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ✅ Get status color dynamically
const getStatusColor = (status: string) => {
  switch (status) {
    case "Upcoming":
      return "text-blue-400";
    case "Ongoing":
      return "text-yellow-400";
    case "Completed":
      return "text-green-400";
    default:
      return "text-white";
  }
};
