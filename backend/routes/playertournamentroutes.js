const express = require("express");
const {
    getAllTournaments,
    registerForTournament,
    joinTournament,
    joinTeam,
    viewResults,
    checkteams,
} = require("../controllers/playertournamentcontroller");

const router = express.Router();

// Get all tournaments for the player
router.get("/", getAllTournaments);

// Register for an upcoming tournament
router.post("/register/:tournamentId", registerForTournament);

// Join an ongoing tournament (only if registered)
router.post("/join/:tournamentId", joinTeam);
router.get("/:id/check-registration",checkteams);
// View results of completed tournaments
router.get("/results", viewResults);


module.exports = router;
