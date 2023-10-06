
import Express from "express";
import { generateToken, getUserByEmail } from "../controller/user.js";
import bcrypt from "bcrypt"
import { User }  from "../models/user.js";

const router = Express.Router()

//login
router.post('/login',async(req,res)=>{
    //check user exists or not
    try{
        const user = await getUserByEmail(req)
        if(!user){
            return res.status(400).json({error:"invalid authorization"})
        }
        const checkedpass = await bcrypt.compare(req.body.password,user.password)
        if(!checkedpass){
            return res.status(400).json({error:"invalid authorization password"})
        }
        const token = generateToken(user._id)
        res.status(200).json({messgae:"Logged in",token})
    }
    catch(error){
        // console.log(err);
        res.status(500).json({error:"internal server"})
    }
})

//signup
router.post('/signup',async(req,res)=>{
    try{
        //check your exists or not
        let user = await getUserByEmail(req)
       
        if(user){
         return res.status(400).json({error:"User already exists"})
        }
        //generate hashed password
        const hashedpass = await bcrypt.hash(req.body.password,10)
        user = await new User({
            ...req.body,
            password:hashedpass,
        }).save()
        //generate token
        const token = generateToken(user._id)
        res.status(201).json({message:"successfully logged in",token})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server"})
    }
})
export const userRouter = router