import mongoose from "mongoose";

export function databaseconnection(){
    const params = {
        useNewUrlParser : true,
        useUnifiedTopology:true
    }
    try{
        mongoose.connect(process.env.DBURL,params)
        console.log("MongoDB connected Succesfully")
    }
    catch(err){
        console.log("MongoDB connecting failed",err);
    }
}