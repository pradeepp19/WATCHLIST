import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "./config.js";
import type { Request, Response } from "express";
import crypto from "crypto";
import { UserModel,ContentModel,LinkModel } from "./db.js";
import { userMiddleware } from "./middleware.js";

const router = express.Router();

router.post("/signup", async(req:Request,res:Response) => {
    const { username, password } = req.body;
    try{
        const hashedpassword = await bcrypt.hash(password,10);
        await UserModel.create({
            username:username,
            password: hashedpassword
        })
        res.json({
            message:"User Signed up"
        })
    }catch(err){
        res.status(411).json({
            message:"User already exists"
        })
    }
})

router.post("/signin", async(req,res) => {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({username});
    if(!existingUser) return res.status(403).json({message:"Incorrect Credentials"})

    const isPasswordValid = await bcrypt.compare(password , existingUser.password as string);
    if(!isPasswordValid) return res.status(403).json({message:"Inavalid Credentials"});

    if (existingUser) {
        const token = jwt.sign({
            _id:existingUser._id
        },JWT_SECRET)
        res.json({
            token
        })
    } else {
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
})

router.post("/content", userMiddleware,async(req,res) =>{
    const { title, type, link, tag } = req.body;

    await ContentModel.create({
        title,
        type,
        link,
        tag,
        userId:req.userId
    })
    res.json({
        message:"Content Added"
    })

})

router.get("/content", userMiddleware, async(req,res) =>{
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","username")
    res.json({
        content
    })
})


router.delete("/content/:id", userMiddleware, async(req,res) =>{
    const userId = req.userId;
    const contentId = req.params.id;

    await ContentModel.findOneAndDelete({
        _id:contentId,
        userId:userId
    })
    res.json({
        message:"Content deleted"
    })
})

router.post("/brain/share",userMiddleware, async(req,res) =>{
    const share = req.body.share;
    if(share) {
        const existingLink = await LinkModel.findOne({
            userId:req.userId
        });

        if(existingLink) {
            res.json({
                hash:existingLink.hash
            })
            return;
        }

    const hash = crypto.randomBytes(16).toString("hex");
    await LinkModel.create({
        userId:req.userId,
        hash:hash
    })
    res.json({
        hash
    })
    } else {
        await LinkModel.deleteOne({
            userId:req.userId
        });
        res.json({
            message:"Removed link"
        })
    }    
})

router.get("/brain/:shareLink",userMiddleware, async(req,res) => {
    const { shareLink } = req.params;

    try{
    const link = await LinkModel.findOne({
        hash:shareLink
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }

    const content = await ContentModel.find({
        userId:link.userId
    })
    res.json({
        content
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching shared content" });
  }
    
})

export default router;