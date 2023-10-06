import React, { useEffect, useState } from 'react'
import Base from '../base/Base'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()
    const[notes,setnotes] = useState("")
    const[err,seterr] = useState("")

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login',{replace:true})
        }
        const fetchData = async()=>{
            const res = await fetch(`http://localhost:4000/api/notes/all`,{
                method:"GET",
                headers:{
                    "x-auth-token":localStorage.getItem('token')
                }
            })
            const data =await res.json()
            if(data.data){
                setnotes(data.data)
            }
            else{
                seterr(data.error)
            }
        }
        fetchData()
    },[])
  return (
    <Base title={"Dashboard"}>
        {notes && (
            <div  className='mt-4'>
                {notes?.map((data)=>(
                    <div className='cardbody card' key={data._id}>
                        <h6 className='mt-2'>Company Name : {data.company}</h6>
                        <h6 className='mt-2'>Role : {data.role}</h6>
                        <h6 className='mt-2'>Package : {data.package}</h6>
                        <h6 className='mt-2'>Questions : {data.questions}</h6>
                        <h6 className='mt-2'>Date : {data.date}</h6>
                        <h6 className='mt-2'>Posted By : {data.user.username}</h6>
                    </div>
                ))}
                {err ? <h5 className='ms-3 mt-3'>{err}</h5> : ""}
            </div>
        )}
    </Base>
  )
}

export default Dashboard