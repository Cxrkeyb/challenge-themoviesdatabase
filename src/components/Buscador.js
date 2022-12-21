import React from 'react'
import swal from 'sweetalert2';
import {useNavigate } from 'react-router-dom';

export default function Buscador() {
    let navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        let token = sessionStorage.getItem("token");
        let keyword = e.currentTarget.keyword.value;
        keyword = keyword.trim();
        if(token == null){
            swal.fire({title: "Error", text: "Debes estar logueado para poder buscar", icon: "error"});
            return;
        }
        if(keyword.length < 4) {
            if(keyword.length === 0){
                swal.fire({title: "La palabra clave no puede estar vacia", text:"Escribe alguna palabra clave " , icon: "error", timer: 3000});
            }else{
                swal.fire({title: "La palabra clave es muy corta", text:"Escribe 4 o mas caracteres" , icon: "warning", timer: 3000});
            }
            return;
        }
        navigate(`resultados?keyword=${keyword}`);
        refreshPage();
        e.currentTarget.keyword.value ='';
    }
  return (
    <form className='d-flex align-items-center justify-content-center' onSubmit={submitHandler}>
        <label htmlFor="userInput" className="form-label d-flex mb-0 mx-2">Email
            <input type="text" name='keyword' className="form-control" id="userInput" placeholder="Escribe una palabra clave..."/>
        </label>
        <button className='btn btn-danger'>Buscar</button>
    </form>
  )
}
