import { sql } from '../../init/db';

export default async function handler(req, res) {
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
    }}