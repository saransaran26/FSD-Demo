import React from 'react'
import '../App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'



function Base({title,children}) {
    const navigate = useNavigate()
    const handlelogout = () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }
   
  return (
    <div className="app">
       <header className='navcol'>
       <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" bg="dark">
      <Container>
        <Navbar.Brand href="#home">FSD Demo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='ms-3' onClick={()=>navigate('/')}>Dashboard</Nav.Link>
            <Nav.Link href="#link" className='ms-3' onClick={()=>navigate('/user')}>My Account</Nav.Link>
            <Nav.Link href="#link" className='ms-3' onClick={()=>navigate('/login')}>Login</Nav.Link>
            <Nav.Link href="#link" className='ms-3' onClick={()=>navigate('/signup')}>Signup</Nav.Link>
            <Nav.Link href="#link" className='ms-3' onClick={handlelogout}>Logout</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
    <main>
        <h1 className='text-align-center title'>{title}</h1>
        <div className='content'>{children}</div>
    </main>
    </div>
  )
}

export default Base