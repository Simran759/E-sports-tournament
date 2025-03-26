const express = require('express');
const router = express.Router();
const pool = require('../init/db'); // Import PostgreSQL connection
const { getTeambycode} = require('../controllers/teamController.js');
router.get("/:id",getTeambycode);
module.exports=router;
