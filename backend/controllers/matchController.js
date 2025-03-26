// 
const sql = require("../init/db"); // Ensure you're correctly importing sql

const getmatchbyid = async (req, res) => {
    const { id } = req.params;
   
    try {
        const result = await sql`SELECT * FROM matches WHERE ID = ${id}`;

        if (result.length === 0) {
            return res.status(404).json({ error: "Match not found" });
        }

        res.json(result[0]); // Return the first match
    } catch (error) {
        console.error("Error fetching match:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updatewinners = async (req, res) => {
    const { matchId, player1score, player2score, tournamentId, player1username, player2username } = req.body;

    if (player1score === "" || player2score === "") {
        return res.status(400).json({ error: "Both scores are required." });
    }

    try {
        // Determine the winner
        let winnerUsername = null;
        if (parseInt(player1score) > parseInt(player2score)) {
            winnerUsername = player1username;
        } else if (parseInt(player2score) > parseInt(player1score)) {
            winnerUsername = player2username;
        }

        // Update match with the winner
        await sql`
            UPDATE matches 
            SET winnerusername = ${winnerUsername} 
            WHERE id = ${matchId}
        `;

        // Update player scores in teams table
        await sql`
            UPDATE teams 
            SET score = ${player1score} 
            WHERE tournamentId = ${tournamentId} AND username = ${player1username}
        `;

        await sql`
            UPDATE teams 
            SET score = ${player2score} 
            WHERE tournamentId = ${tournamentId} AND username = ${player2username}
        `;

        res.status(200).json({
            message: "Score updated successfully!"
        });
    } catch (error) {
        console.error("Error updating score:", error);
        res.status(500).json({ error: "Failed to update scores." });
    }
};

module.exports = { getmatchbyid, updatewinners };
