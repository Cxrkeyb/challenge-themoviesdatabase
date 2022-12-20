import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import Cargando from './Cargando';
import star from '../media/img/star.png';
import group from '../media/img/group.png';
import '../css/Detalle.css'

export default function Detalle() {
  // Set the data in a state
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [productionCs, setProductionCs] = useState([]);

  useEffect(() => {
    // Get the data of the url and set the movieid
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');
    // Endpoint to get the movie details
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=349dc623bd9a8c5b606a4dba88ff1d8b&language=es-ES`;
    axios.get(endPoint)
      .then((res) => {
        setMovie(res.data);
        setGenres(res.data.genres);
        setLanguages(res.data.spoken_languages);
        setProductionCs(res.data.production_companies);
      })
      .catch(err => {
        Swal.fire({title:'Hubo errores, intenta mas tarde', icon : "error"});
      })
  }, []);
  let token = sessionStorage.getItem('token');
  return (
    <>
    {!token && <Navigate to='/' />}
    {!movie && <Cargando />}
    {movie && 
      <>
        <div className='container-fluid bg-dark bg-opacity-75 bg-gradient'>
          <div className='card bg-dark text-white gap-3 my-2 p-5 d-flex justify-content-center flex-column align-items-center'>
            <div className='d-flex p-xxl-5 flex-xxl-row flex-column gap-xxl-5'>
              <div className='d-flex justify-content-center justify-content-xxl-start align-items-xxl-center'>
                <img className='posterMovie' alt='poster movie' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              </div>
              <div className='d-flex containerRightSize flex-column gap-2 align-items-center '>
                <div className='d-flex align-items-center flex-column'>
                    <h2>{movie.title}</h2>
                    <span>{movie.release_date}</span>
                </div>
                <span className='overviewMovie'>
                    {movie.overview}
                </span>
                <div className='movieDouble bg-secondary text-black bg-opacity-75 d-flex justify-content-around p-2'>
                  <div className='movieSizeC'>
                    <h6>Calificacion</h6>
                    <div className='d-flex align-items-center gap-1'>
                      <img src={star} className='scoreImg' alt='Stars: '/>
                      <span>{movie.vote_average}</span>
                    </div>
                  </div>
                  <div className='movieSizeC'>
                    <h6>Votos</h6>
                    <div className='d-flex align-items-center gap-1'>
                      <img src={group} className='scoreImg' alt='Stars: '/>
                      <span>{movie.vote_count}</span>
                    </div>
                  </div>
                </div>
                <h2>Generos</h2>
                <div className='d-flex genreMovie justify-content-around'>
                    {genres.map((genero)=>
                      {return(
                      <div key={genero.id} className='d-flex bg-light text-black bg-opacity-75 justify-content-center align-items-center p-2'>
                        {genero.name}
                      </div>)}
                    )}
                </div>
              </div>
            </div>
            <div className='container dataMovie d-flex justify-content-around flex-row gap-2'>
              <div className='d-flex flex-column justify-content-start align-items-center'>
                <div className='productionSize d-flex align-items-center justify-content-center border-bottom'>Lenguajes</div>
                {languages.map((language)=>
                {return <div key={language.iso_639_1} className='productionsMovie d-flex align-items-center justify-content-center text-center border-bottom'>{language.english_name}</div>}
                )}
              </div>
              <div className='d-flex flex-column justify-content-start align-items-center'>
              <div className='productionSize d-flex align-items-center justify-content-center border-bottom'>Productoras</div>
                {productionCs.map((production)=>
                  { 
                    return <div key={production.id} className='productionsMovie d-flex align-items-center justify-content-center text-center border-bottom'>{production.name}</div>}
                )}
              </div>
            </div>
            {
              movie.budget > 0 ?
              <div className='movieDouble bg-secondary text-black bg-opacity-75 d-flex justify-content-around p-2'>
                <div>
                  <h6>Presupuesto</h6>
                  <div className='d-flex justify-content-start gap-1'>
                    <span>${movie.budget > 999999 ? `${(movie.budget/1000000).toFixed(0)} millones de` : `${(movie.budget/1000).toFixed(0)} miles de`} USD</span>
                  </div>
                </div>
                <div>
                  <h6>Recaudacion</h6>
                  <div className='d-flex align-items-center gap-1'>
                    <span>${movie.revenue > 999999 ? `${(movie.revenue/1000000).toFixed(0)} millones de` : `${(movie.revenue/1000).toFixed(0)} miles de`} USD</span>
                  </div>
                </div>
              </div>
              : null
            }
            <img className='backdropMovie' alt='backdrop movie' src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
          </div>
        </div>
      </>
    }
      
    </>
    
    
  )
}