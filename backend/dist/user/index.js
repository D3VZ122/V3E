"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userrouter = require("./user");
const taskrouter = require("./task");
const router = express_1.default.Router();
router.use("/user", userrouter);
router.use("/task", taskrouter);
module.exports = router;
