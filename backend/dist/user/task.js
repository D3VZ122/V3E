"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const middleware_1 = __importDefault(require("./middleware"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/tasks", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    if (userId) {
        const resp = yield prisma.task.findMany({
            where: {
                userId
            }
        });
        res.json({
            resp
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}));
router.get("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const respbyid = yield prisma.task.findFirst({
            where: {
                id
            }
        });
        return res.json({
            respbyid
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "Error Fetching Specific Task",
            success: false
        });
    }
}));
router.post("/tasks", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { title, description, Due_at } = req.body;
    try {
        const add = yield prisma.task.create({
            data: {
                title,
                description,
                userId,
                Due_at
            }
        });
        res.json({
            message: "Added Successfully",
            sucess: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Same title already present",
            success: "false"
        });
    }
}));
router.put("/tasks/:id", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    const { userId } = req;
    try {
        const existingTask = yield prisma.task.findUnique({
            where: { id: taskId, userId }
        });
        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = yield prisma.task.update({
            where: { id: taskId },
            data: updatedTaskData
        });
        res.json(updatedTask);
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.delete("/tasks/:id", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const taskId = req.params.id;
    try {
        const exist = yield prisma.task.findUnique({
            where: { id: taskId, userId }
        });
        if (!exist) {
            return res.status(404).json({ message: "Task not found" });
        }
        const deletetask = yield prisma.task.delete({
            where: {
                id: taskId
            }
        });
        return res.json({
            message: "Deleted Successfully",
            success: true
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
module.exports = router;
