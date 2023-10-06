import React, { useEffect, useState } from 'react'
import Base from '../base/Base'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Addnotes({usernotes,setusernotes}) {
  const[company,setcompany] = useState("")
  const[role,setrole] = useState("")
  const[pack,setpack] = useState("")
  const[question,setquestion] = useState("")
  const[err,seterr] = useState("")
  const[msg,setmsg] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate('/login',{replace:true})
    }
  })
  async function handleaddnotes (){
    const updatednotes = {
      company:company,
      role:role,
      package:pack,
      questions:question
    }
    const res = await fetch(`http://localhost:4000/api/notes/user/add`,{
      method:"POST",
      body:JSON.stringify(updatednotes),
      headers:{
          "Content-Type":"application/json",
          "x-auth-token":localStorage.getItem('token')
      }
    })
    const data = await res.json()
    if(data.data){
      setusernotes([...usernotes,data.data])
    }else{
      seterr(data.error)
      setmsg(data.message)
      // navigate('/user')
    }
  }

  return (
    <Base title={"Add Notes"}>
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
    <Form.Control type="text" placeholder="Packaage" className='ms-3 input' value={pack} onChange={(e)=>setpack(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label  className='label ms-3'>Questions</Form.Label>
    <Form.Control type="text" placeholder="Questions" className='ms-3 quesinput' value={question} onChange={(e)=>setquestion(e.target.value)}/>
  </Form.Group>
  <button className='btn btn-primary ms-3 mt-2' onClick={handleaddnotes}>Add Notes</button>
  </Form>
  {err ? <h5 className='ms-3 mt-3'>{err}</h5> : ""}
  {msg ? <h5 className='ms-3 mt-3'>{msg}</h5> : ""}
    </Base>
  )
}

export default Addnotes