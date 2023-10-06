
import Express from "express";
import { addNewUser, deleteNotes, editNotes, getAllNotes, getUserNotes } from "../controller/notes.js";

const router = Express.Router()

//get all notes
router.get('/all',async(req,res)=>{
    try {
        const notes = await getAllNotes()
        if(!notes || notes.length <= 0){
            return res.status(404).json({error:"No content available"})
        }
        res.status(200).json({data:notes})
        
    } catch (error) {
        console.log(err)
        res.status(500).json({error:"Internal server"})
    }
})

//get users notes
router.get('/user/all',async(req,res)=>{
    try {
        const notes = await getUserNotes(req)
        if(!notes || notes.length <= 0){
            return res.status(404).json({error:"No content available"})
        }
        res.status(200).json({data:notes})
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal server"})
    }
})

//add new notes
router.post('/user/add',async(req,res)=>{
    try {
        const newNotes = await addNewUser(req)
        if(!newNotes){
            return res.status(400).json({error:"Error occured while posting"})
        }
        res.status(201).json({message:"Succesfully posted",data: newNotes})
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal server"})
    }
})

//edit notes
router.put('/user/edit/:id',async(req,res)=>{
    try {
        const updatedNotes = await editNotes(req)
        console.log(updatedNotes)
        if(!updatedNotes){
            return res.status(400).json({error:"Error occured while updating"})
        }
        res.status(200).json({message:"Succesfully updated",data: updatedNotes})
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal server"})
    }
})

//delete notes
router.delete('/user/delete/:id',async(req,res)=>{
    try {
        const deletednotes = await deleteNotes(req)
        if(!deleteNotes){
            return res.status(400).json({error:"Error occured while deleted"})
        }
        res.status(200).json({message:"Succesfully deleted"})
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal server"})
    }
})

export const notesrouter = router