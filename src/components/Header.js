import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../media/img/logohorizontal.png'

export default function Header() {
    
  return (
    <header>
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'><img style={{height:'10vh'}} alt='logo' src={logo}></img></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link text-white" aria-current="page" to='/'>Home</Link>
                    <Link className="nav-link text-white-50 " to='/listado'>Listado</Link>
                    <Link className="nav-link text-white-50 " to=''>Contacto</Link>
                </div>
                </div>
            </div>
        </nav>
    </header>
    
  )
}
