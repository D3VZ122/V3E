import jwt, { JwtPayload } from "jsonwebtoken";

export default function middleware(req: any, res: any, next: any) {
    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token;
        const secret = process.env.jwt_secret || " ";
        try {

            const verify = jwt.verify(token, secret) as JwtPayload;
        
            req.userId = verify.userid;
            next();
        } catch (error) {
            console.log("catch")
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        console.log("not present"); 
        res.status(401).json({ message: "Unauthorized" });
    }
}
