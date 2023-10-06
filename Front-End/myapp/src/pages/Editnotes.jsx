import React, { useEffect, useState } from 'react'
import Base from '../base/Base'
import {useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';

function Editnotes({usernotes,setusernotes}) {
  const[company,setcompany] = useState("")
  const[role,setrole] = useState("")
  const[pack,setpack] = useState("")
  const[question,setquestion] = useState("")
  const[err,seterr] = useState("")
  const[msg,setmsg] = useState("")
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate('/login',{replace:true})
    }
    const data = usernotes.find((data)=>data._id === id)
    if(data){
      setcompany(data.company)
      setrole(data.role)
      setpack(data.package)
      setquestion(data.questions)
    }
  },[id,usernotes])
  async function handleedit (){
    const editednotes = {
      company:company,
      role:role,
      package:pack,
      questions:question
    }
    console.log(editednotes)
    const res = await fetch(`http://localhost:4000/api/notes/user/edit/${id}`,{
      method:"PUT",
      body:JSON.stringify(editednotes),
      headers:{
          "Content-Type":"application/json",
          "x-auth-token":localStorage.getItem("token")
      }
    })
    const data = await res.json()
    if(data.data){
      const findindex = usernotes.findindex((data)=>data._id === id)
      usernotes[findindex] = data.data
      await setusernotes({...usernotes})
      setmsg(data.message)
      console.log(msg)
    }else{
      seterr(data.error)
    }
  }
  return (
    <Base title={"Edit Notes"}>
      <Form>
    <Form.Group className="mb-3">
    <Form.Label  className='label ms-3'>Company Name:</Form.Label>
    <Form.Control type="text" placeholder="Company name" className='ms-3 input' value={company} onChange={(e)=>setcompany(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label  className='label ms-3'>Role</Form.Label>
    <Form.Control type="text" placeholder="Role" className='ms-3 input' value={role} onChange={(e)=>setrole(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label  className='label ms-3'>Package</Form.Label>
    <Form.Control type="number" placeholder="Packaage" className='ms-3 input' value={pack} onChange={(e)=>setpack(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label  className='label ms-3'>Questions</Form.Label>
    <Form.Control type="text" placeholder="Questions" className='ms-3 quesinput' value={question} onChange={(e)=>setquestion(e.target.value)}/>
  </Form.Group>
  <button className='btn btn-primary ms-3 mt-2' onClick={handleedit}>Edit Notes</button>
  {console.log(msg)}
  {err ? <h5 className='ms-3 mt-3'>{err}</h5> : ""}
  {msg ? <h5 className='ms-3 mt-3'>{msg}</h5> : ""}
  </Form>
  
    </Base>
  )
}

export default Editnotes