const express = require('express');
const router = express.Router();
const pool = require('../init/db'); // Import PostgreSQL connection
const { create, logout, show, updateTournament, getTournamentById ,deleteTournament,scheduleMatches,showMatches,showTeams} = require('../controllers/tournamentController');

// Tournament Routes
router.post('/create', create);
router.get('/show', show);
router.get("/:id", getTournamentById);  // Fetch tournament by ID
router.put('/update/:id', updateTournament); // Update tournament by ID
router.delete("/delete/:id",deleteTournament);
router.post("/schedule-matches/:id",scheduleMatches);
router.get("/:id/matches",showMatches);
router.get("/:id/teams",showTeams);
module.exports = router;








// router.get('/my-tournament-matches', authenticateUser, async (req, res) => {
//     const ownerUsername = req.user.userName; // Extract from JWT

//     try {
//         const result = await pool.query(
//             `SELECT M.ID AS MatchID, M.TournamentID, T.Name AS TournamentName, 
//                     P1.Name AS Player1, P2.Name AS Player2, 
//                     W.Name AS Winner, M.Score 
//              FROM Matches M
//              JOIN Tournaments T ON M.TournamentID = T.ID
//              LEFT JOIN Players P1 ON M.Player1ID = P1.ID
//              LEFT JOIN Players P2 ON M.Player2ID = P2.ID
//              LEFT JOIN Players W ON M.WinnerID = W.ID
//              WHERE T.OwnerUsername = $1
//              ORDER BY T.Date ASC`,
//             [ownerUsername]
//         );

//         res.json(result.rows);
//     } catch (error) {
//         console.error('Error fetching matches:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// router.get('/my-tournament-players', authenticateUser, async (req, res) => {
//     const ownerUsername = req.user.userName; // Extract from JWT

//     try {
//         const result = await pool.query(
//             `SELECT P.ID AS PlayerID, P.Name AS PlayerName, P.Rank, T.Name AS TournamentName 
//              FROM Players P
//              JOIN Tournaments T ON P.TeamID = T.ID
//              WHERE T.OwnerUsername = $1
//              ORDER BY P.Rank ASC`,
//             [ownerUsername]
//         );

//         res.json(result.rows);
//     } catch (error) {
//         console.error('Error fetching players:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

