
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Base from './base/Base';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Addnotes from './pages/Addnotes';
import Editnotes from './pages/Editnotes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';


function App() {
 
  const[usernotes,setusernotes] = useState([])
  return (
   <Routes>
    <Route exact path='/' element={<Dashboard></Dashboard>}></Route>
    <Route path='/add' element={<Addnotes usernotes={usernotes} setusernotes={setusernotes}></Addnotes>}></Route>
    <Route path='/edit/:id' element={<Editnotes usernotes={usernotes} setusernotes={setusernotes}></Editnotes>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path='/user' element={<User usernotes={usernotes} setusernotes={setusernotes}></User>}></Route>
   </Routes>
    
  )
}

export default App
