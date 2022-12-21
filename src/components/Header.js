import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Buscador from './Buscador';
import logo from '../media/img/logohorizontal.png'

export default function Header({favorites, token}) {
  
  return (
    <Navbar bg="dark" expand="lg">
    <Container>
      <Navbar.Brand><Link className="navbar-brand" to='/'><img style={{height:'10vh'}} alt='logo' src={logo}></img></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className='text-white'>Home</Nav.Link>
          <Nav.Link href="/listado" className='text-white-50'>Listado</Nav.Link>
          {token ? 
            <Nav.Link href="/favoritos" className='text-white-50'>Favoritos</Nav.Link>
            : null
          }
          {favorites.length > 0 && token ? <Nav.Link href="/favoritos" className='text-danger'>Peliculas en favoritos: {favorites.length}</Nav.Link>: null}
        </Nav>
        {token ? 
            <Buscador />
            : null
        }
      </Navbar.Collapse>
    </Container>
  </Navbar>
    
  )
}
