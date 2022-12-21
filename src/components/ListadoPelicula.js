import React from 'react'
import {Link} from 'react-router-dom'
import imgerror from '../media/img/technicalissues.jpg'
import '../css/ListadoPelicula.css'

export default function ListadoPelicula({id,title, description, poster, addOrRemoveFromFavs, favorites}) {
  let img, textDescription;
  // Detects if the overview has more than 20 characters 
  if(title.length > 20){
    title = `${title.substring(0,20)}...`
  }
  // If the description hasnt text
  if(description.length > 0){
    textDescription = `${description.substring(0, 100)}...`;
  }else{
    textDescription = "La pelicula no tiene descripcion."
  }
  if(poster != null){
    img = `https://image.tmdb.org/t/p/w500/${poster}`
  }else{
    img = imgerror;
  }
  let isMovieinArray = favorites.find((movie) => {
    return parseInt(movie.id) === parseInt(id);
  })
  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 overflow-hidden'>
        <div className="card bg-dark my-2">
          <img src={img} className="card-img-top imgSize" alt="" />
          <button className="btn-favorite" onClick={addOrRemoveFromFavs} data-movieid={id}>{isMovieinArray ? <span>❤</span>:<span>🖤</span>}</button>
          <div className="card-body d-flex flex-column justify-content-between cardSize">
            <h5 className="card-title text-white">{title}</h5>
            <p className="card-text text-white">{textDescription}</p>
            <Link to={`/detalle?movieID=${id}`} className="btn btn-danger">Ver mas...</Link>
          </div>
        </div>
      </div>
  )
}
