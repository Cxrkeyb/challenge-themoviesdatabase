import React from 'react'
import { Navigate } from 'react-router-dom';
import ListadoPelicula from './ListadoPelicula';

export default function Listado() {
    // Take the token data from the localStorage
    let token = localStorage.getItem('token');
    const peliculas = []
    let img, title, description;
  return (
    <>
      {!token && <Navigate to='/' />}
      <div className='row text-center g-0'>
        {peliculas.map(() => {return(<ListadoPelicula key={title} title={title} img={img} description={description} />)})}
      </div>
    </>
    
  )
}
