"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function middleware(req, res, next) {
    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token;
        const secret = process.env.jwt_secret || " ";
        try {
            const verify = jsonwebtoken_1.default.verify(token, secret);
            req.userId = verify.userid;
            next();
        }
        catch (error) {
            console.log("catch");
            res.status(401).json({ message: "Unauthorized" });
        }
    }
    else {
        console.log("not present");
        res.status(401).json({ message: "Unauthorized" });
    }
}
exports.default = middleware;
