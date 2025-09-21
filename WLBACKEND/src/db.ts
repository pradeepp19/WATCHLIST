import mongoose, {model, Schema}  from "mongoose";
import { MONGO_URL } from "./config.js";

export const connectDB = async(): Promise<void> => {
    try{
        const MONGO_URL = process.env.MONGO_URL as string;
        await mongoose.connect(MONGO_URL);
        console.log("MonogoDb connected");
    }catch (err) {
        console.error("Error - MonogoDb not connected",err);
    }
};


const userSchema = new Schema({
    username : {type:String,unique:true},
    password : String
})
export const UserModel = model("User",userSchema);


const contentSchema = new Schema({
    title: String,
    type: String,
    link: String,
    tag :[{type: mongoose.Types.ObjectId, ref:'Tag'}],
    userId: {type:mongoose.Types.ObjectId ,ref:'User',required:true}
})
export const ContentModel = model("Content",contentSchema);


const linkSchema = new Schema({
    hash: String,
    userId : {type:mongoose.Types.ObjectId, ref:'User', required:true}
})
export const LinkModel = model("Link",linkSchema);
