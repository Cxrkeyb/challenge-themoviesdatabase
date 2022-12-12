import React from 'react'
import {Link} from 'react-router-dom'
import '../css/ListadoPelicula.css'

export default function ListadoPelicula({id,title, description, img}) {
  // Detects if the overview has 
  if(title.length > 20){
    title = `${title.substring(0,20)}...`
  }
  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 overflow-hidden'>
        <div className="card bg-dark my-4">
          <img src={img} className="card-img-top imgSize" alt="" />
          <div className="card-body d-flex flex-column justify-content-between cardSize">
            <h5 className="card-title text-white">{title}</h5>
            <p className="card-text text-white">{description}</p>
            <Link to={`/detalle?movieID=${id}`} className="btn btn-danger">Ver mas...</Link>
          </div>
        </div>
      </div>
  )
}
