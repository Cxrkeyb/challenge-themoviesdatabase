import React from 'react'
import '../css/Cargando.css'

export default function Cargando() {
  return (
    <div className="spinnerContainer d-flex justify-content-center align-items-center">
        <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}
