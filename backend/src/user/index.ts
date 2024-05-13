import express from "express";

const userrouter = require("./user");
const taskrouter = require("./task");

const router = express.Router();


router.use("/user",userrouter);
router.use("/task",taskrouter);

module.exports = router;


