const express = require('express');
const router = express.Router();
const pool = require('../init/db'); // Import PostgreSQL connection
const { getmatchbyid,updatewinners} = require('../controllers/matchController.js');
router.get("/:id",getmatchbyid);
router.put("/score",updatewinners);
module.exports=router;
