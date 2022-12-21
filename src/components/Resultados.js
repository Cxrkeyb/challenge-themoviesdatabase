import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ListadoPelicula from './ListadoPelicula';
import errorhomer from '../media/img/homero.jpg'
import '../css/Resultados.css'

export default function Resultados({addOrRemoveFromFavs, favorites}) {
    // Get the data of the url and set the movieid
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');
    const [moviesData, setMoviesData] = useState([]);
    
    useEffect(() => {
        // Endpoint to get the movie details
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=349dc623bd9a8c5b606a4dba88ff1d8b&query=${keyword}&language=es-ES`;
        axios.get(endPoint)
          .then((res) => {
            setMoviesData(res.data.results);
            if(res.data.results.length === 0) {
                Swal.fire({title:'No hay resultados con esta palabra clave', icon : "error", timer: 3000});
            }
          })
          .catch(err => {
            Swal.fire({title:'Hubo errores, intenta mas tarde', icon : "error"});
          })
    }, [keyword]);
    let token = sessionStorage.getItem('token');
  return (
    <>
        {!token && <Navigate to='/' />}
        <div className='p-4 row text-center g-4 bg-dark bg-opacity-75 bg-gradient'>
            <h2 className='text-light'>Buscaste: {keyword}</h2>
            {moviesData.length > 0 ? moviesData.map((movie) => {return(<ListadoPelicula key={movie.id} title={movie.title} id={movie.id} poster={movie.poster_path} description={movie.overview} addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites} />)}):
            <div className='resultadosContainer d-flex justify-content-center align-items-center'>
              <div className='bg-dark d-flex justify-content-center align-items-center flex-column p-4 card'>
                <h3 className='text-danger'>No hay resultados con esta palabra clave</h3>
                <img className='errorHomer' src={errorhomer} alt='Homero triste'/>
              </div>
            </div>
            }
        </div>
    </>
  )
}
