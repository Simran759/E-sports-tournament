// // const { Pool } = require('pg');
// // require('dotenv').config({ path: '../.env' });  // Adjust the path if needed

// // const pool = new Pool({
// //     user: process.env.DB_USER,
// //     host: process.env.DB_HOST,
// //     database: process.env.DB_NAME,
// //     password: process.env.DB_PASSWORD,
// //     port: process.env.DB_PORT
// // });
// const { Pool } = require('pg');
// require('dotenv').config({ path: '../.env' }); 
// const {neon}=require('@neondatabase/serverless')
// const clinet=neon(process.env.DATABASE_URL);

// console.log(process.env.DATABASE_URL)
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// //   ssl: { require: true,  rejectUnauthorized: false },
  
// // });

// // pool.connect()
// //   .then(() => console.log("Connected to Neon PostgreSQL ✅"))
// //   .catch(err => console.error("Connection error ❌", err));

// // module.exports = pool;

// // Test database connection
// // pool.connect()
// //     .then(() => {
// //         console.log('✅ Database connected successfully!');
// //         createTables();
// //     })
// //     .catch(err => console.error('❌ Database connection error:', err));

// // Function to create tables if they don't exist
// const createTables = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS Users (
//             userName VARCHAR(100) PRIMARY KEY,
//             Email VARCHAR(255) UNIQUE NOT NULL,
//             Password TEXT NOT NULL,
//             Role VARCHAR(10) NOT NULL CHECK (Role IN ('admin', 'player'))
//         );

//         CREATE TABLE IF NOT EXISTS Tournaments (
//             ID SERIAL PRIMARY KEY,
//             Name VARCHAR(100) NOT NULL,
//             GameID INT NOT NULL,
//             Date DATE NOT NULL,
//             Status VARCHAR(50) NOT NULL CHECK (Status IN ('Upcoming', 'Ongoing', 'Completed')),
//             OwnerUsername VARCHAR(100) NOT NULL REFERENCES Users(userName) ON DELETE CASCADE
//         );

//         CREATE TABLE IF NOT EXISTS Teams (
//             Teamcode VARCHAR(55),
//             UserName VARCHAR(100) NOT NULL REFERENCES Users(userName) ON DELETE CASCADE,
//             TournamentID INT NOT NULL REFERENCES Tournaments(ID) ON DELETE CASCADE,
//             Score INT DEFAULT 0,
//             PRIMARY KEY (Teamcode ,UserName, TournamentID)
//         );

//         CREATE TABLE IF NOT EXISTS Matches (
//             ID SERIAL PRIMARY KEY,
//             TournamentID INT REFERENCES Tournaments(ID) ON DELETE CASCADE,
//             Player1Username VARCHAR(100) NOT NULL REFERENCES Users(userName) ON DELETE CASCADE,
//             Player2Username VARCHAR(100) NOT NULL REFERENCES Users(userName) ON DELETE CASCADE,
//             WinnerUsername VARCHAR(100) REFERENCES Users(userName) ON DELETE SET NULL
//         );
//     `;

//     try {
//         await pool.query(query);
//         console.log('✅ Tables ensured (Users, Tournaments, Teams, Matches)');
//     } catch (error) {
//         console.error('❌ Error creating tables:', error);
//     }
// };
// // export default pool;
// // module.exports = pool;
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '../.env' });

const sql = neon(process.env.DATABASE_URL);

console.log("Connecting to Database:", process.env.DATABASE_URL);

const createTables = async () => {
    try {
        // Create Users table
        await sql`
            CREATE TABLE IF NOT EXISTS Users (
                userName VARCHAR(100) PRIMARY KEY,
                Email VARCHAR(255) UNIQUE NOT NULL,
                Password TEXT NOT NULL,
                Role VARCHAR(10) NOT NULL CHECK (Role IN ('admin', 'player'))
            );
        `;

        // Create Tournaments table
        await sql`
            CREATE TABLE IF NOT EXISTS Tournaments (
                ID SERIAL PRIMARY KEY,
                Name VARCHAR(100) NOT NULL,
                GameID INT NOT NULL,
                Date DATE NOT NULL,
                Status VARCHAR(50) NOT NULL CHECK (Status IN ('Upcoming', 'Ongoing', 'Completed')),
                OwnerUsername VARCHAR(100) NOT NULL REFERENCES Users(userName) ON DELETE CASCADE
            );
        `;

        // Create Teams table
        await sql`
            CREATE TABLE IF NOT EXISTS Teams (
                Teamcode VARCHAR(55),
                UserName VARCHAR(100) NOT NULL REFERENCES Users(userName) ON DELETE CASCADE,
                TournamentID INT NOT NULL REFERENCES Tournaments(ID) ON DELETE CASCADE,
                Score INT DEFAULT 0,
                PRIMARY KEY (Teamcode, UserName, TournamentID)
            );
        `;

        // Create Matches table
        await sql`
            CREATE TABLE IF NOT EXISTS Matches (
                ID SERIAL PRIMARY KEY,
                TournamentID INT REFERENCES Tournaments(ID) ON DELETE CASCADE,
                Player1Username VARCHAR(100) NOT NULL REFERENCES Users(userName) ON DELETE CASCADE,
                Player2Username VARCHAR(100) NOT NULL REFERENCES Users(userName) ON DELETE CASCADE,
                WinnerUsername VARCHAR(100) REFERENCES Users(userName) ON DELETE SET NULL
            );
        `;

        console.log('✅ Tables ensured (Users, Tournaments, Teams, Matches)');
    } catch (error) {
        console.error('❌ Error creating tables:', error);
    }
};

// Test connection and create tables
(async () => {
    try {
        console.log('🔄 Connecting to database...');
        await createTables();
        console.log('✅ Database setup complete.');
    } catch (err) {
        console.error('❌ Database setup failed:', err);
    }
})();

module.exports = sql;
