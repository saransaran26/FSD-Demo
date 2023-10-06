import React, { useEffect, useState } from 'react'
import Base from '../base/Base'
import { useNavigate } from 'react-router-dom'

function User({usernotes,setusernotes}) {
    const navigate = useNavigate()
    // const[notes,setnotes] = useState("")
    const[err,seterr] = useState("")

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login',{replace:true})
        }
        const fetchData = async()=>{
            const res = await fetch(`http://localhost:4000/api/notes/user/all`,{
                method:"GET",
                headers:{
                    "x-auth-token":localStorage.getItem('token')
                }
            })
            const data =await res.json()
            if(data.data){
                setusernotes(data.data)
            }
            else{
                seterr(data.error)
            }
        }
        fetchData()
    },[])
    const handledelete = async(id) =>{
        const res = await fetch(`http://localhost:4000/api/notes/user/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "x-auth-token":localStorage.getItem('token')
            }
        })
        const data = await res.json()
        const findindex = usernotes.findindex((data)=>data._id === id)
        // const deletednotes = usernotes.filter((data)=>data.id != id)
        const deletednotes = usernotes.slice(index,1)
        setusernotes([...usernotes])
    }
  return (
    <Base title={"User"}>
        <div className='toaddnotes'>
            <button className='btn btn-primary' onClick={()=>navigate('/add')}>Add Notes</button>
        </div>
        {usernotes && (
            <div  className='mt-4'>
                {usernotes?.map((data)=>(
                    <div className='cardbody card' key={data._id}>
                        <h6 className='mt-2'>Company Name : {data.company}</h6>
                        <h6 className='mt-2'>Role : {data.role}</h6>
                        <h6 className='mt-2'>Package : {data.package}</h6>
                        <h6 className='mt-2'>Questions : {data.questions}</h6>
                        <h6 className='mt-2'>Date : {data.date}</h6>
                        <h6 className='mt-2'>Posted By : {data.user.username}</h6>
                        <h6 className='mt-2'>Email : {data.user.email}</h6>
                        <div className='mt-3 mb-2'>
                            <button className='btn btn-primary' onClick={()=>navigate(`/edit/${data._id}`)}>Edit</button>
                            <button className='btn btn-danger ms-4' onClick={()=>handledelete(data._id)}>Delete</button>
                        </div>
                    </div>
                ))}
                {err ? <h5 className='ms-3 mt-3 usererr'>{err}</h5> : ""}
            </div>
        )}
    </Base>
  )
}

export default User