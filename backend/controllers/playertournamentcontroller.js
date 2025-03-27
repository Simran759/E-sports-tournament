// const pool = require("../init/db");

// // Get all tournaments
// const getAllTournaments = async (req, res) => {
//     try {
//         const result = await pool.query("SELECT * FROM Tournaments");
//         res.json(result.rows);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch tournaments" });
//     }
// };

// // Register for a tournament
// const registerForTournament = async (req, res) => { 
//     const { tournamentId } = req.params;
//     const {  teamCode ,username} = req.body; // Accept teamId
//     // console.log(teamCode,tournamentId,username);
//     try {
//         await pool.query(
//             "INSERT INTO Teams (TeamCode, TournamentID, Username, Score) VALUES ($1, $2, $3, 0)",
//             [teamCode, tournamentId, username]
//         );
//         res.json({ message: "Registered successfully!" });
//     } catch (error) {
//         console.error("❌ Registration Error:", error); // 🔴 Log the exact error
//         res.status(500).json({ error: error.message }); // Send detailed error response
//     }
// };



// // Join an ongoing tournament (only if registered)
// const joinTournament = async (req, res) => {
//     const { tournamentId } = req.params;
//     const { teamCode,username } = req.body;

//     try {
//         const result = await pool.query(
//             "SELECT * FROM Teams WHERE TournamentID = $1 AND Username == $2",
//             [tournamentId, username]
//         );

//         if (result.rows.length > 0) {
//             const result1=await pool.query( "INSERT INTO Teams (TeamCode, TournamentID, Username, Score) VALUES ($1, $2, $3, 0)",
//                 [teamCode, tournamentId, username])
//             res.json({ message: "You can join this tournament!" });

//         } else {
//             res.status(403).json({ error: "You are not registered for this tournament" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Failed to join tournament" });
//     }
// };
// const joinTeam = async (req, res) => {
//     const { tournamentId } = req.params;
//     const { teamCode,username } = req.body;

//     try {
//         const result = await pool.query(
//             "SELECT * FROM Teams WHERE TournamentID = $1 AND Username != $2",
//             [tournamentId, username]
//         );

//         if (result.rows.length > 0) {
//             const result1=await pool.query( "INSERT INTO Teams (TeamCode, TournamentID, Username, Score) VALUES ($1, $2, $3, 0)",
//                 [teamCode, tournamentId, username])
//             res.json({ message: "You can join this tournament!" });

//         } else {
//             res.status(403).json({ error: "You are not registered for this tournament" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Failed to join tournament" });
//     }
// };

// // View results of completed tournaments
// const viewResults = async (req, res) => {
//     try {
//         const result = await pool.query(
//             "SELECT * FROM Tournaments WHERE Status = 'Completed'"
//         );
//         res.json(result.rows);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch tournament results" });
//     }
// };
// const checkteams=async (req, res) => {
//     const {id: tournamentId } = req.params;
    
//     const {username: username } = req.query;
 
//     try {
//       // Query to check if the user is already registered for the tournament
//       const result = await pool.query('SELECT * FROM teams WHERE tournamentid = $1 AND username=$2',[tournamentId,username]);
//         // console.log(result.rows);
//       if (result.rows.length> 0) {
//         res.json({ isRegistered: true });
//       } else {
//         res.json({ isRegistered: false });
//       }
//     } catch (err) {
//       console.error('Failed to check user registration:', err);
//       res.status(500).json({ error: 'Failed to check user registration' });
//     }
//   };
// module.exports = { getAllTournaments, registerForTournament, joinTournament, joinTeam,viewResults,checkteams };
const sql = require("../init/db");

// Get all tournaments
const getAllTournaments = async (req, res) => {
    try {
        const { searchQuery, searchBy } = req.query; // Extract search parameters
        let result;

        if (searchQuery && searchBy) {
            switch (searchBy) {
                case "name":
                    result = await sql`
                        SELECT * FROM Tournaments WHERE Name ILIKE ${searchQuery + "%"}
                    `;
                    break;
                case "gameid":
                    result = await sql`
                        SELECT * FROM Tournaments WHERE GameID::TEXT LIKE ${searchQuery + "%"}
                    `;
                    break;
                case "status":
                    result = await sql`
                        SELECT * FROM Tournaments WHERE Status ILIKE ${searchQuery + "%"}
                    `;
                    break;
                default:
                    result = await sql`SELECT * FROM Tournaments`;
            }
        } else {
            result = await sql`SELECT * FROM Tournaments`;
        }

        res.json(result);
    } catch (error) {
        console.error("❌ Failed to fetch tournaments:", error);
        res.status(500).json({ error: "Failed to fetch tournaments" });
    }
};





// Register for a tournament
const registerForTournament = async (req, res) => {
    const { tournamentId } = req.params;
    const { teamCode, username } = req.body;

    try {
        // Check if the team code already exists in ANY tournament (not just this one)
        const existingTeam = await sql`
            SELECT TournamentID FROM Teams WHERE TeamCode = ${teamCode} LIMIT 1
        `;

        if (existingTeam.length > 0 && existingTeam[0].tournamentid !== tournamentId) {
            return res.status(400).json({ error: "Team code already registered in another tournament" });
        }

        // Register the new team
        await sql`
            INSERT INTO Teams (TeamCode, TournamentID, Username, Score) 
            VALUES (${teamCode}, ${tournamentId}, ${username}, 0)
        `;

        res.json({ message: "Registered successfully!" });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Join an ongoing tournament (only if registered)
const joinTournament = async (req, res) => {
    const { tournamentId } = req.params;
    const { teamCode, username } = req.body;

    try {
        const result = await sql`
            SELECT * FROM Teams WHERE TournamentID = ${tournamentId} AND Username = ${username}
        `;

        if (result.length > 0) {
            await sql`
                INSERT INTO Teams (TeamCode, TournamentID, Username, Score) 
                VALUES (${teamCode}, ${tournamentId}, ${username}, 0)
            `;
            res.json({ message: "You can join this tournament!" });
        } else {
            res.status(403).json({ error: "You are not registered for this tournament" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to join tournament" });
    }
};

const joinTeam = async (req, res) => {
    const { tournamentId } = req.params;
    const { teamCode, username } = req.body;

    try {
        // Check if the team code exists in the tournament
        const existingTeam = await sql`
            SELECT * FROM Teams WHERE TournamentID = ${tournamentId} AND TeamCode = ${teamCode}
        `;

        if (existingTeam.length === 0) {
            return res.status(404).json({ error: "Team code not found in this tournament" });
        }

        // Check if the user is already in the team
        const existingUser = await sql`
            SELECT * FROM Teams WHERE TournamentID = ${tournamentId} AND TeamCode = ${teamCode} AND Username = ${username}
        `;

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "You are already part of this team" });
        }

        // Add the user to the existing team
        await sql`
            INSERT INTO Teams (TeamCode, TournamentID, Username, Score) 
            VALUES (${teamCode}, ${tournamentId}, ${username}, 0)
        `;

        res.json({ message: "You have joined the team successfully!" });

    } catch (error) {
        console.error("❌ Join Team Error:", error);
        res.status(500).json({ error: "Failed to join team" });
    }
};


// View results of completed tournaments
const viewResults = async (req, res) => {
    try {
        const result = await sql`
            SELECT * FROM Tournaments WHERE Status = 'Completed'
        `;
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tournament results" });
    }
};

// Check if a user is registered in a tournament
const checkteams = async (req, res) => {
    const { id: tournamentId } = req.params;
    const { username } = req.query;

    try {
        const result = await sql`
            SELECT * FROM teams WHERE tournamentid = ${tournamentId} AND username = ${username}
        `;

        res.json({ isRegistered: result.length > 0 });
    } catch (err) {
        console.error("Failed to check user registration:", err);
        res.status(500).json({ error: "Failed to check user registration" });
    }
};

module.exports = { getAllTournaments, registerForTournament, joinTournament, joinTeam, viewResults, checkteams };
