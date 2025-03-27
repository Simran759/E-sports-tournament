// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function PlayerTournaments() {
//   const router = useRouter();
//   const [tournaments, setTournaments] = useState<any[]>([]);
//   const [userName, setUserName] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userName");
//     const token=localStorage.getItem("token");
//     if(!token)
//     {
//       router.push("/login");
//       return;
//     }
//     if (storedUser) {
//       setUserName(storedUser);
//     }
//     fetchTournaments();
//   }, []);

//   const fetchTournaments = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/player-tournaments");
//       setTournaments(response.data);
//     } catch (err) {
//       setError("Failed to fetch tournaments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p className="text-center text-white">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
//       <h2 className="text-3xl mb-4">Available Tournaments</h2>

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
//           {tournaments.map((tournament) => (
//             <tr key={tournament.id} className="border-b border-gray-700">
//               <td className="p-3">{tournament.name}</td>
//               <td className="p-3">{tournament.gameid}</td>
//               <td className="p-3">{new Date(tournament.date).toLocaleDateString()}</td>
//               <td className="p-3 font-bold">
//                 {tournament.status === "Upcoming" ? (
//                   <span className="text-blue-400">Upcoming</span>
//                 ) : tournament.status === "Ongoing" ? (
//                   <span className="text-yellow-400">Ongoing</span>
//                 ) : (
//                   <span className="text-green-400">Completed</span>
//                 )}
//               </td>
//               <td className="p-3 flex gap-2">
//                 {tournament.status === "Upcoming" || tournament.status === "Ongoing" ? (
//                   <button
//                     onClick={() => router.push(`/enter-tournament/${tournament.id}`)}
//                     className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-700"
//                   >
//                     Enter
//                   </button>
//                 ) : tournament.status === "Completed" ? (
//                   <button
//                     onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
//                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
//                   >
//                     View Results
//                   </button>
//                 ) : null}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PlayerTournaments() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    if (storedUser) {
      setUserName(storedUser);
    }
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/player-tournaments`, {
            params: { search: searchQuery, searchBy }
        });
        setTournaments(response.data);
        setFilteredTournaments(response.data);
    } catch (err) {
        setError("Failed to fetch tournaments.");
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    const filtered = tournaments.filter((tournament) => {
      const query = searchQuery.toLowerCase();
      if (searchBy === "name") {
        return tournament.name?.toLowerCase().includes(query);
      } else if (searchBy === "gameid") {
        return tournament.gameid?.toString().includes(query);
      } else if (searchBy === "status") {
        return tournament.status?.toLowerCase().includes(query);
      }
      return false;
    });
    setFilteredTournaments(filtered);
  }, [searchQuery, searchBy, tournaments]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-3xl mb-4">Available Tournaments</h2>

      <div className="mb-4 flex gap-2 w-3/4">
        <input
          type="text"
          placeholder={`Search by ${searchBy}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-700 text-white border border-gray-500 rounded focus:outline-none focus:border-blue-400"
        />
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white border border-gray-500 rounded focus:outline-none"
        >
          <option value="name">Name</option>
          <option value="gameid">Game ID</option>
          <option value="status">Status</option>
        </select>
      </div>

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
                <td className="p-3 flex gap-2">
                  {tournament.status === "Upcoming" || tournament.status === "Ongoing" ? (
                    <button
                      onClick={() => router.push(`/enter-tournament/${tournament.id}`)}
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-700"
                    >
                      Enter
                    </button>
                  ) : tournament.status === "Completed" ? (
                    <button
                      onClick={() => router.push(`/complete-leaderboard/${tournament.id}`)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      View Results
                    </button>
                  ) : null}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

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
