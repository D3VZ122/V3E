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
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const signupbody = zod_1.default.object({
    name: zod_1.default.string().optional(),
    Email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6, "Minimum 6 Length Needed")
});
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { success, error } = signupbody.safeParse(data);
    if (success) {
        try {
            const existingUser = yield prisma.user.findFirst({
                where: {
                    Email: data.Email
                }
            });
            if (existingUser) {
                return res.status(401).json({ message: "Email already taken" });
            }
            if (data.password.length < 6) {
                return res.status(400).json({ message: "Minimum 6 characters password is needed" });
            }
            const newUser = yield prisma.user.create({
                data: {
                    Email: data.Email,
                    name: data.name,
                    password: bcrypt_1.default.hashSync(data.password, 10)
                }
            });
            return res.status(201).json(newUser.id);
        }
        catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    else {
        return res.status(400).json({ message: "Atleast 6 Length is needed fo password" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, password } = req.body;
    try {
        const an = yield prisma.user.findFirst({
            where: {
                Email
            }
        });
        if (!an) {
            return res.status(401).json({
                message: "User Does Not exist",
                success: false
            });
        }
        else {
            const hasedpass = an.password;
            const verifiedpass = yield bcrypt_1.default.compare(password, hasedpass);
            const secret = process.env.jwt_secret || "";
            if (verifiedpass) {
                const token = jsonwebtoken_1.default.sign({ userid: an.id }, secret);
                res.cookie("token", token, {
                    // Prevent client-side JavaScript access
                    secure: true, // Send cookies only over HTTPS
                    sameSite: 'none' // Allow cross-site usage
                });
                res.cookie("name", an.name, {
                    secure: true,
                    sameSite: 'none'
                });
                return res.json({
                    message: "Login SUccessfull",
                    success: true
                });
            }
            else {
                return res.status(401).json({
                    message: "Wrong Credentials",
                    success: false
                });
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error connecting to Database"
        });
    }
}));
module.exports = router;
