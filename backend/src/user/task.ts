import express from "express";
import { PrismaClient } from "@prisma/client";
import middleware from "./middleware";

declare global {
  namespace Express {
    interface Request {
      userId?: string; 
    }
  }
}

const router = express.Router();
const prisma = new PrismaClient();

router.get("/tasks", middleware, async (req, res) => {
  const { userId } = req;
  if (userId) {
   
    const resp = await prisma.task.findMany({
        where:{
            userId
        }
    })

    res.json({
        resp
    })

  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/tasks/:id",async(req,res)=>{
    const id  = req.params.id;
    try{
   const respbyid  = await prisma.task.findFirst({
    where:{
        id
    }
   })

   return res.json({
    respbyid
   })
}
catch(error){
    return res.status(401).json({
        message:"Error Fetching Specific Task",
        success:false
    })
}
})



router.post("/tasks",middleware,async(req,res)=>{
    const {userId}  = req;
    const {title,description,Due_at} = req.body;

    try{
    const add = await  prisma.task.create({
        data:{
            title,
            description,
            userId,
            Due_at
        }
    })

    res.json({
        message:"Added Successfully",
        sucess:true
    });
}

catch(error){
    console.log(error);
    return res.status(401).json({
        message:"Same title already present",
        success:"false"
    })
}

})


router.put("/tasks/:id",middleware, async (req, res) => {
    const taskId = req.params.id;
    const updatedTaskData = req.body; 
    const {userId} = req;
    try {
     
        const existingTask = await prisma.task.findUnique({
            where: { id: taskId ,userId}
        });

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: updatedTaskData
        });

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/tasks/:id",middleware,async(req,res)=>{
    const {userId} = req;
    const  taskId = req.params.id;
try{
    const exist = await prisma.task.findUnique({
        where:{id:taskId,userId}
    })
    if (!exist) {
        return res.status(404).json({ message: "Task not found" });
    }
    const deletetask = await prisma.task.delete({
        where:{
            id:taskId
        }
    });
    return res.json({
        message:"Deleted Successfully",
        success:true
    })

}
catch(error){
    res.status(500).json({message:"Internal Server Error"});
}
})


module.exports = router;
