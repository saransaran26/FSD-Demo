import { ObjectId } from "bson";
import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    package:{
        type:Number,
        required:true
    },
    questions:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"user"
    }
})

const Notes = mongoose.model("note",notesSchema)
export { Notes }