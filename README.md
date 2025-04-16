










# 🏆 eSports Tournament Management System
 
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square)](https://e-sports-tournament-jdn7.vercel.app/)
 
A database-driven full-stack web app to manage eSports tournaments, players, teams, and matches — with dynamic updates using cron jobs.

---
## ✅ Features

### 👑 Admin
- Manage tournaments: create, update, delete.
- Schedule matches (automated & manual).
- View player stats and tournament data.
- Update player scores and match results.

### 🧑‍🎮 Player
- Register and login.
- Join upcoming tournaments.
- Track participation in ongoing and completed tournaments.
- View current position and overall team performance.

### 🔁 Background Cron Functionality
- **Every minute**: Tournament statuses (upcoming → ongoing → completed) are updated based on real-time.
- **Daily at 12 PM**: New matches are automatically scheduled for ongoing tournaments.

---
## ⚙️ Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Frontend    | Next.js (App Router) |
| Backend     | Node.js + Express |
| Database    | PostgreSQL (hosted on [Neon.tech](https://neon.tech)) |
| Cron Jobs   | `node-cron`       |
| Hosting     | Vercel |
| Environment | .env files (Backend & Frontend) |

---

  
  

## 🧩 Step 1: Clone Project

  

```bash

git  clone  https://github.com/your-username/esports-tournament.git
cd  esports-tournament

```

  

---

  

## 🛠️ Step 2: Setup Backend

```bash
cd  backend
npm  install

```

📄 Create `.env` file inside `/backend` and add:

  

```env

DATABASE_URL="your_neon_postgresql_connection_string"

```

  

🔗 Go to [Neon.tech](https://neon.tech), create a project in Azure, and copy the PostgreSQL connection string.

  

▶️ Start the Backend Server

  

```bash

node  index.js

```

  

> Server runs on: `http://localhost:5000`

  

---

  

## 🎨 Step 3: Setup Frontend

  

```bash

cd  ../frontend

npm  install

```

  

📄 Create `.env.local` inside `/frontend` and add:

  

```env

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

```

  

▶️ Run the Frontend

  

```bash

npm  run  dev

```

  

> App will run on: `http://localhost:3000`

  

---

  

## ⚙️ Cron-based Functionality

  

- ✅ Tournament statuses updated every **minute**

- 🕛 Matches scheduled **daily at 12:00 PM**

  




  

---
## 📸 Screenshots
  
  
### 🔐 Login  
![Login](E-sports-Tournament/frontend/public/Login.png)


### 📝 Sign Up  
![SignUp](E-sports-Tournament/frontend/public/Signup.png)

### 📊 Admin Dashboard 
![Admin Dashboard](E-sports-Tournament/frontend/public/AdminDashboard.png)

### 📊 Player Dashboard 
![Player Dashboard ](E-sports-Tournament/frontend/public/PlayerDashboard.png)


### Admin Activities (Schedule , Delete ,  Show Matches ,  Edit)
![Admin Role](E-sports-Tournament/frontend/public/AdminActivite.png)
### ➕ Create Tournament Form By Admin
![Create Tournament ](E-sports-Tournament/frontend/public/CreateTournament.png)

### 🧾 Manage Score By Admin
![Manage Score](E-sports-Tournament/frontend/public/ManageScoreByAdmin.png)

### Show Matches for Admin 
![	Show Matches](E-sports-Tournament/frontend/public/OngoingMatchesdetailsAdminSide.png)

### Register/Join Team By Player
![	Register/Join](E-sports-Tournament/frontend/public/PLayerRegistration.png)

### Leaderboard of Respective Matches
![	Respective Matches Leaderboard](E-sports-Tournament/frontend/public/RespectiveMatcheLeaderboard.png)

### Leaderboard of Overall Teams
![Overall Teams Leaderboard](E-sports-Tournament/frontend/public/OverallteamLeaderboard.png)



## 👨‍💻 Author

  

Made with 💻 by:
- [Simran](https://github.com/Simran759)
- [Kriti Bhatnagar](https://github.com/kritibhatnagar86)
- [Diya Chhawal](https://github.com/diya-chhawal)




## 📄 Submission Details

*Submitted To:*  
Dr. Namita Mittal  
DIS Lab, Department of Computer Science & Engineering  
Malaviya National Institute of Technology (MNIT), Jaipur

*Note:* Submitted as part of semester project work.

🔗 [Live Demo](https://e-sports-tournament-jdn7.vercel.app/)
---
