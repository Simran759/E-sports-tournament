// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const pool = require("./init/db"); // Database Connection
// const authRoutes = require("./routes/authRoutes");
// const tournamentRoutes = require("./routes/tournamentRoutes");
// const playerTournamentRoutes = require("./routes/playertournamentroutes"); // ✅ Import new player routes
// const teamRoutes = require("./routes/teamroutes"); 
// const matchRoutes = require("./routes/matchRoutes"); 
// const cron = require("node-cron");

// // Initialize Express App
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Runs every 12 hours to update tournament statuses
// cron.schedule("* * * * *", async () => {
//     console.log("🔄 Checking and updating tournament statuses...");

//     try {
//         const today = new Date();
//         today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
//         const formattedToday = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

//         // Update to "Ongoing" if today's date matches the tournament date
//         await pool.query(
//             `UPDATE Tournaments 
//              SET Status = 'Ongoing' 
//              WHERE CAST(Date AS DATE) = CAST($1 AS DATE) AND Status = 'Upcoming'`,
//             [formattedToday]
//         );

//         // Update to "Completed" if the tournament date has passed
//         await pool.query(
//             `UPDATE Tournaments 
//              SET Status = 'Completed' 
//              WHERE CAST(Date AS DATE) < CAST($1 AS DATE) AND Status != 'Completed'`,
//             [formattedToday]
//         );

//         console.log("✅ Tournament statuses updated successfully");
//     } catch (error) {
//         console.error("❌ Error updating tournament statuses:", error);
//     }
// });

// // New cron job to run at 12:00 AM every day to schedule matches
// cron.schedule("0 0 * * *", async () => {
//     console.log("🌙 Running daily match scheduling task at 12 AM...");

//     try {
//         const today = new Date();
//         today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
//         const formattedToday = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

//         // Fetch tournaments where the date matches today's date and status is 'Upcoming'
//         const tournamentRes = await pool.query(
//             `SELECT id FROM Tournaments WHERE CAST(Date AS DATE) = CAST($1 AS DATE) AND Status = 'Upcoming'`,
//             [formattedToday]
//         );

//         if (tournamentRes.rows.length === 0) {
//             console.log("❌ No tournaments found for today.");
//             return;
//         }

//         // Process each tournament and schedule matches
//         for (const tournament of tournamentRes.rows) {
//             const tournamentId = tournament.id;

//             console.log(`🕹️ Scheduling matches for tournament ID: ${tournamentId}`);

//             // Fetch all players in the tournament
//             const playersRes = await pool.query(
//                 "SELECT teamcode, username FROM teams WHERE tournamentid = $1",
//                 [tournamentId]
//             );

//             const teamDict = {};

//             // Organize players by team
//             playersRes.rows.forEach(row => {
//                 if (!teamDict[row.teamcode]) {
//                     teamDict[row.teamcode] = [];
//                 }
//                 teamDict[row.teamcode].push(row.username);
//             });

//             const teamCodes = Object.keys(teamDict);

//             // Ensure there are at least two teams
//             if (teamCodes.length < 2) {
//                 console.log(`❌ Not enough teams for tournament ID: ${tournamentId}`);
//                 continue;
//             }

//             const usedPlayers = new Set();
//             const matches = [];

//             while (true) {
//                 const availableTeams = teamCodes.filter(tc => teamDict[tc].some(p => !usedPlayers.has(p)));

//                 if (availableTeams.length < 2) break; // Stop if we can't form a match

//                 const team1 = availableTeams[0];
//                 const team2 = availableTeams[1];

//                 const player1 = teamDict[team1].find(p => !usedPlayers.has(p));
//                 const player2 = teamDict[team2].find(p => !usedPlayers.has(p));

//                 if (player1 && player2) {
//                     matches.push({
//                         tournament_id: tournamentId,
//                         player1username: player1,
//                         player2username: player2,
//                         winning_team_code: null
//                     });

//                     usedPlayers.add(player1);
//                     usedPlayers.add(player2);
//                 }
//             }

//             // Insert scheduled matches into the database
//             if (matches.length > 0) {
//                 const matchInsertQueries = matches.map(match =>
//                     pool.query(
//                         "INSERT INTO matches (tournamentid, player1username, player2username, winnerusername) VALUES ($1, $2, $3, $4) RETURNING *",
//                         [match.tournament_id, match.player1username, match.player2username, match.winning_team_code]
//                     )
//                 );

//                 await Promise.all(matchInsertQueries);

//                 console.log(`✅ Matches scheduled for tournament ID: ${tournamentId}`);
//             } else {
//                 console.log(`❌ No matches could be scheduled for tournament ID: ${tournamentId}`);
//             }
//         }
//     } catch (error) {
//         console.error("❌ Error scheduling matches:", error);
//     }
// });

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // API Routes
// app.use("/auth", authRoutes);
// app.use("/tournament", tournamentRoutes);
// app.use("/player-tournaments", playerTournamentRoutes); // ✅ Add new player tournament routes
// app.use("/teams",teamRoutes);
// app.use("/matches",matchRoutes);

// // Test Route
// app.get("/", (req, res) => {
//     res.send("🎮 Gaming Tournament API is running!");
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("./init/db"); // ✅ Import NeonDB connection
const authRoutes = require("./routes/authRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const playerTournamentRoutes = require("./routes/playertournamentroutes");
const teamRoutes = require("./routes/teamroutes");
const matchRoutes = require("./routes/matchRoutes");
const cron = require("node-cron");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// ⏳ Runs every 12 hours to update tournament statuses
cron.schedule("* * * * *", async () => {
    console.log("🔄 Checking and updating tournament statuses...");

    try {
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        const formattedToday = today.toISOString().split("T")[0];

        await sql`
            UPDATE Tournaments 
            SET Status = 'Ongoing' 
            WHERE CAST(Date AS DATE) = ${formattedToday} AND Status = 'Upcoming'
        `;

        await sql`
            UPDATE Tournaments 
            SET Status = 'Completed' 
            WHERE CAST(Date AS DATE) < ${formattedToday} AND Status != 'Completed'
        `;

        console.log("✅ Tournament statuses updated successfully");
    } catch (error) {
        console.error("❌ Error updating tournament statuses:", error);
    }
});

cron.schedule("0 0 * * *", async () => {
    console.log("🌙 Running daily match scheduling task at 12 AM...");

    try {
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        const formattedToday = today.toISOString().split("T")[0];

        const tournamentRes = await sql`
            SELECT id FROM Tournaments WHERE CAST(Date AS DATE) = ${formattedToday} AND Status = 'Upcoming'
        `;

        if (tournamentRes.length === 0) {
            console.log("❌ No tournaments found for today.");
            return;
        }

        for (const tournament of tournamentRes) {
            const tournamentId = tournament.id;

            console.log(`🕹️ Scheduling matches for tournament ID: ${tournamentId}`);

            const playersRes = await sql`
                SELECT teamcode, username FROM Teams WHERE tournamentid = ${tournamentId}
            `;

            const teamDict = {};

            playersRes.forEach(row => {
                if (!teamDict[row.teamcode]) {
                    teamDict[row.teamcode] = [];
                }
                teamDict[row.teamcode].push(row.username);
            });

            const teamCodes = Object.keys(teamDict);

            if (teamCodes.length < 2) {
                console.log(`❌ Not enough teams for tournament ID: ${tournamentId}`);
                continue;
            }

            const usedPlayers = new Set();
            const matches = [];

            while (true) {
                const availableTeams = teamCodes.filter(tc => teamDict[tc].some(p => !usedPlayers.has(p)));
                if (availableTeams.length < 2) break;

                const team1 = availableTeams[0];
                const team2 = availableTeams[1];

                const player1 = teamDict[team1].find(p => !usedPlayers.has(p));
                const player2 = teamDict[team2].find(p => !usedPlayers.has(p));

                if (player1 && player2) {
                    matches.push({
                        tournament_id: tournamentId,
                        player1username: player1,
                        player2username: player2,
                        winning_team_code: null
                    });

                    usedPlayers.add(player1);
                    usedPlayers.add(player2);
                }
            }

            if (matches.length > 0) {
                await Promise.all(matches.map(match =>
                    sql`
                        INSERT INTO Matches (tournamentid, player1username, player2username, winnerusername) 
                        VALUES (${match.tournament_id}, ${match.player1username}, ${match.player2username}, ${match.winning_team_code})
                    `
                ));

                console.log(`✅ Matches scheduled for tournament ID: ${tournamentId}`);
            } else {
                console.log(`❌ No matches could be scheduled for tournament ID: ${tournamentId}`);
            }
        }
    } catch (error) {
        console.error("❌ Error scheduling matches:", error);
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/auth", authRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/player-tournaments", playerTournamentRoutes);
app.use("/teams", teamRoutes);
app.use("/matches", matchRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🎮 Gaming Tournament API is running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
