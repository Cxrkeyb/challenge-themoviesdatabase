import React from 'react'
import question from '../media/img/question.svg'
import '../css/Recovery.css'
import { Link } from 'react-router-dom'

export default function Recovery() {
  return (
    <div className='resultadosContainer d-flex justify-content-center align-items-center'>
        <div className='bg-dark d-flex justify-content-center align-items-center flex-column p-4 card gap-2'>
          <h3 className='text-danger'>Datos</h3>
          <div className='text-white d-flex justify-content-center align-items-center flex-column'>
            <h4>Correo: </h4>
            <span className='text-white-50'>challenge@alkemy.org</span>
          </div>
          <div className='text-white d-flex justify-content-center align-items-center flex-column'>
            <h4>Contraseña: </h4>
            <span className='text-white-50'>react</span>
          </div>
          <img className='questionSVG' src={question} alt='Helping data'/>
          <Link className='btn btn-danger' to='/'>Volver al login</Link>
        </div>
    </div>
  )
}
