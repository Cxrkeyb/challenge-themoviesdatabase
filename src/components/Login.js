import React from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import {useNavigate } from 'react-router-dom';
import sherk from '../media/gif/sherk.gif'

export default function Login() {
  // Allow to navigate to another page
  let navigate = useNavigate();
  // Form function
  const submitHandler = (e) => {
    // We prevent the refresh of the form
    e.preventDefault();
    
    //Take the values from the inputs
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    // Detect if the email is valid
    // eslint-disable-next-line
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    
    // If the email and password are empty stop the form
    if(email === '' || password === '') {
      swal({text: 'Los campos no pueden estar vacios.', icon: "warning"});
      return; 
    }
    // We use the regex to detect if the email is valid
    if(email !== '' && !regexEmail.test(email)){
      swal({text: 'Debes escribir una direccion de correo valida.', icon: "warning"});
      return;
    }
    // A valid email and password
    if(email !== 'challenge@alkemy.org' || password !== 'react'){
      swal({text: 'Credenciales invalidas', icon: "warning"});
      return;
    }
    // Post the email and password to get the token of the user
    axios.post('http://challenge-react.alkemy.org', {email, password})
      .catch(err => console.log(err))
      .then(res => {
        swal(
        <div>
            <h5> Bienvenido a The Movies Database!!</h5>
            <img className='image-fluid rounded' src={sherk} alt='Sherk opening the door.'/>
        </div>,
        {text: 'Credenciales validos', icon: "success"});
        const token = res.data.token;
        // Storing the token in the localStorage
        localStorage.setItem('token', token);
        // Redirect to another page
        navigate("/listado");
      })
    
  }
  const banana = [2,3,4]
  return (
    <div className='container d-flex justify-content-center flex-column h-100 align-content-center align-items-center'>
        <form onSubmit={submitHandler} className='card d-flex flex-column align-items-center p-5 bg-light bg-opacity-70'>
          {banana.forEach(()=>{
            return(<h2>Hola</h2>)
          })}
            <h3>The Movies Database</h3>
            <span className='fw-bold fs-5'>Welcome back!</span>
            <small className='text-muted'>Sign in to continue</small>
            <div className="mb-3">
                <label htmlFor="userInput" className="form-label">Email
                  <input type="text" name='email' className="form-control" id="userInput" placeholder="Enter email"/>
                </label>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password
                  <input type="password" name='password' className="form-control" id="passwordInput" placeholder="Enter password"/>
                </label>
            </div>
            <button className='btn btn-primary'>Continue</button>
            <a href='hola'>Forgot your password?</a>
        </form>
    </div>
  )
}
