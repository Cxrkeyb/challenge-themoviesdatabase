import React from 'react'
import { Navigate } from 'react-router-dom';
import ListadoPelicula from './ListadoPelicula';
import errorhomer from '../media/img/homero.jpg'

export default function Favoritos({addOrRemoveFromFavs, favorites}) {
  // Take the token data from the localStorage
  let token = sessionStorage.getItem('token');
  return (
    <>
     {!token && <Navigate to='/' />}
     {favorites.length > 0 ? 
      <div className='p-4 row text-center g-4 bg-dark bg-opacity-75 bg-gradient'>
        {favorites.map((movie) => {return(<ListadoPelicula addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites} key={movie.id} title={movie.titleMovie} id={movie.id} poster={movie.imgURL} description={movie.overviewMovie} />)})}
      </div> :
      <div className='resultadosContainer d-flex justify-content-center align-items-center'>
        <div className='bg-dark d-flex justify-content-center align-items-center flex-column p-4 card'>
          <h3 className='text-danger'>No tienes peliculas favoritas</h3>
          <img className='errorHomer' src={errorhomer} alt='Homero triste'/>
        </div>
      </div>
    }
      
    </>
  )
}
