import { Notes } from "../models/notes.js";

export function getAllNotes(){
    return Notes.find().populate("user","username")
}

export function getUserNotes(req){
    return Notes.find({user:req.user._id}).populate("user","username email")
}

export function addNewUser(req){
    const newDate = new Date().toJSON().slice(0,10)
    return new Notes({
        ...req.body,
        date:newDate,
        user:req.user._id
    }).save()
}

export function editNotes(req){
    return Notes.findOneAndUpdate(
        {_id:req.params.id},
        {$set:req.body},
        {new:true}
    )
}

export function deleteNotes(req){
    return Notes.findByIdAndDelete({
        _id:req.params.id
    })
}