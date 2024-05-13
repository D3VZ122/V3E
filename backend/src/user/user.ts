import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt, { hashSync } from "bcrypt";
import z, { string } from "zod";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient(); 

const signupbody = z.object({
    name: z.string().optional(),
    Email: z.string().email(),
    password: z.string().min(6, "Minimum 6 Length Needed")
});

const router = express.Router();

router.post("/signup", async (req, res) => {
    const data = req.body;
    const { success, error } = signupbody.safeParse(data);
    if (success) {
        try {
            const existingUser = await prisma.user.findFirst({
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
            const newUser = await prisma.user.create({ 
                data: {
                    Email: data.Email,
                    name: data.name,
                    password: bcrypt.hashSync(data.password, 10) 
                }
            });
            
            return res.status(201).json(newUser.id);
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        return res.status(400).json({ message: "Atleast 6 Length is needed fo password" });
    }
});




router.post("/signin",async(req,res)=>{
    const {Email,password}  = req.body;

    try {
        const an = await prisma.user.findFirst({
            where:{
                Email
            }
        });
        if(!an){
            return res.status(401).json({
                message:"User Does Not exist",
                success:false
            })
        }
        else{
            const hasedpass = an.password;
            const verifiedpass = await bcrypt.compare(password,hasedpass);
            const secret = process.env.jwt_secret||"";
                
          
            if(verifiedpass){
                const token = jwt.sign({userid:an.id},secret);
               
                return res.json({
                    message:"Login SUccessfull",
                    success:true,
                    token
                })
            }
            else{
                return res.status(401).json({
                    message:"Wrong Credentials",
                    success:false
                })
            }
            
        }
        
    } catch (error) {
        return res.status(400).json({
            message:"error connecting to Database"
        })
    }

})

module.exports = router;
