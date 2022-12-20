import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ListadoPelicula from './ListadoPelicula';

export default function Listado() {
    // Take the token data from the localStorage
    let token = sessionStorage.getItem('token');
    const [moviesList, setMoviesList] = useState([]);
    // Endpoint to use to get the list of movies
    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=349dc623bd9a8c5b606a4dba88ff1d8b&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
    useEffect(() => {
      axios.get(endPoint)
        .then((res) => {
          setMoviesList(res.data.results)
        })
        .catch(err => {
          Swal.fire({title:'Hubo errores, intenta mas tarde', icon : "error"});
        })
    }, []);
  return (
    <>
      {!token && <Navigate to='/' />}
      <div className='p-4 row text-center g-4 bg-dark bg-opacity-75 bg-gradient'>
        {moviesList.map((movie) => {return(<ListadoPelicula key={movie.id} title={movie.title} id={movie.id} img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} description={`${movie.overview.substring(0, 100)}...`} />)})}
      </div>
    </>
    
  )
}
