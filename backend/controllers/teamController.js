// const pool = require("../init/db");

// const getTeambycode = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//       const result = await pool.query("SELECT * FROM Teams WHERE ID = $1", [id]);
      
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "Team  not found" });
//       }
  
//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error("Error fetching tournament:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };
  
// module.exports = { getTeambycode };
const sql = require("../init/db"); // Ensure you're correctly importing sql

const getTeambycode = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await sql`SELECT * FROM Teams WHERE ID = ${id}`;

        if (result.length === 0) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.json(result[0]); // Access the first element directly
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getTeambycode };
