import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import Cargando from './Cargando';
import star from '../media/img/star.png';
import group from '../media/img/group.png';
import imgerror from '../media/img/technicalissues.jpg'
import '../css/Detalle.css'

export default function Detalle() {
  // Set the data in a state
  const [movie, setMovie] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [poster, setPoster] = useState(null);
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
        setBackdrop(res.data.backdrop_path);
        setPoster(res.data.poster_path);
      })
      .catch(err => {
        Swal.fire({title:'Hubo errores, intenta mas tarde', icon : "error"});
      })
  }, []);
  let token = sessionStorage.getItem('token');
  let img, imgbackdrop;
  if(poster != null){
    img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  }else{
    img = imgerror;
  }
  if(backdrop != null){
    imgbackdrop = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
  }else{
    imgbackdrop = imgerror;
  }
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
                <img className='posterMovie' alt='poster movie' src={img} />
              </div>
              <div className='d-flex containerRightSize flex-column gap-2 align-items-center justify-content-xxl-center'>
                <div className='d-flex align-items-center flex-column'>
                    <h2>{movie.title}</h2>
                    <span>{movie.release_date}</span>
                </div>
                <span className='textMovie'>
                    {movie.overview}
                </span>
                <div className='movieDouble bg-secondary text-black bg-opacity-75 d-flex justify-content-around p-2'>
                  <div className='movieSizeC'>
                    <h6 className='titleMovie'>Calificacion</h6>
                    <div className='d-flex align-items-center gap-1'>
                      <img src={star} className='scoreImg' alt='Stars: '/>
                      <span className='textMovie'>{movie.vote_average}</span>
                    </div>
                  </div>
                  <div className='movieSizeC'>
                    <h6 className='titleMovie'>Votos</h6>
                    <div className='d-flex align-items-center gap-1'>
                      <img src={group} className='scoreImg' alt='Stars: '/>
                      <span className='textMovie'>{movie.vote_count}</span>
                    </div>
                  </div>
                </div>
                <h2>Generos</h2>
                {genres.length > 0 ? 
                  <div className='d-flex genreMovie justify-content-around'>
                    {genres.map((genero)=>
                      {return(
                      <div key={genero.id} className='textMovie d-flex bg-light text-black bg-opacity-75 justify-content-center align-items-center p-2'>
                        {genero.name}
                      </div>)}
                    )}
                  </div>
                  :
                  <span>No tiene generos especificados</span>
                }
              </div>
            </div>
            <div className='container dataMovie d-flex justify-content-around flex-row gap-2'>
              <div className='d-flex flex-column justify-content-start align-items-center'>
                <div className='productionSize d-flex align-items-center justify-content-center border-bottom titleMovie p-xxl-2'>Lenguajes</div>
                {languages.map((language)=>
                {return <div key={language.iso_639_1} className='productionsMovie textMovie d-flex align-items-center justify-content-center text-center border-bottom'>{language.english_name}</div>}
                )}
              </div>
              <div className='d-flex flex-column justify-content-start align-items-center'>
              <div className='productionSize d-flex align-items-center justify-content-center border-bottom titleMovie p-xxl-2'>Productoras</div>
                {productionCs.map((production)=>
                  { 
                    return <div key={production.id} className='productionsMovie textMovie d-flex align-items-center justify-content-center text-center border-bottom'>{production.name}</div>}
                )}
              </div>
            </div>
            {
              movie.budget > 0 ?
              <div className='movieDouble bg-secondary text-black bg-opacity-75 d-flex justify-content-around p-4'>
                <div>
                  <h6 className='titleMovie'>Presupuesto</h6>
                  <div className='d-flex justify-content-start gap-1'>
                    <span className='textMovie'>${movie.budget >= 1000000 ? `${(movie.budget/1000000).toFixed(0)} millones de` : `${(movie.budget/1000).toFixed(0)} miles de`} USD</span>
                  </div>
                </div>
                <div>
                  <h6 className='titleMovie'>Recaudacion</h6>
                  <div className='d-flex align-items-center gap-1'>
                    <span className='textMovie'>${movie.revenue >= 1000000 ? `${(movie.revenue/1000000).toFixed(0)} millones de` : `${(movie.revenue/1000).toFixed(0)} miles de`} USD</span>
                  </div>
                </div>
              </div>
              : null
            }
            <img className='backdropMovie' alt='backdrop movie' src={imgbackdrop} />
          </div>
        </div>
      </>
    }
      
    </>
    
    
  )
}