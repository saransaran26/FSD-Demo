import React, { useState } from 'react'
import Base from '../base/Base'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Signup() {
    const[username,setusername] = useState("")
    const[email,setemail] = useState("")
    const[password,setpassword] = useState("")
    const[err,seterr] = useState("")
    const navigate = useNavigate()

    const handlesignup = async() =>{
        const payload = {
            username,email,password
        }
        const res = await fetch(`http://localhost:4000/api/user/signup`,{
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json()
        if(data.token){
            localStorage.setItem('token',data.token)
            navigate('/')
        }
        else{
            seterr(data.error)
            setemail("")
            setusername("")
            setpassword("")
        }
    }
  return (
    <Base title={"Sign Up"}>
    <Form>
    <Form.Group className="mb-3">
    <Form.Label  className='label ms-3'>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter Name" className='ms-3 input' value={username} onChange={(e)=>setusername(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label  className='label ms-3 mt-3'>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" className='ms-3 input' value={email} onChange={(e)=>setemail(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label className='label ms-4 mt-3'>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" className='ms-3 input' value={password} onChange={(e)=>setpassword(e.target.value)}/>
  </Form.Group>
  <Button variant="primary" type="submit" className='ms-3 mt-4' onClick={handlesignup}>
    Sign Up
  </Button>
  
</Form>
{err ? <h5 className='ms-3 mt-3'>{err}</h5> : ""}
</Base>
    
  )
}

export default Signup