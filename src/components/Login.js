import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useNavigate, Link, Navigate } from 'react-router-dom';
import logo from '../media/img/logo.png'

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
      swal.fire({text: 'Los campos no pueden estar vacios.', icon: "warning"});
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
    // Detects if the email and password are valid
    if(email === 'challenge@alkemy.org' && password === 'react'){
      new swal({
      title: '<h5>Bienvenido a The Movies Database</h5>',
      text: 'Credenciales validos',
      imageUrl: 'https://thumbs.gfycat.com/ChillyFrayedAsiandamselfly-max-1mb.gif',
      imageHeight: "20vh",
      imageAlt:'back',
      icon: "success"});
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE';
        //Storing the token in the localStorage
        localStorage.setItem('token', token);
        //Redirect to another page
        navigate("/listado");
    }
    // Axios post on netlify doesnt works because the url is a http instead a https
    // Post the email and password to get the token of the user
    // axios.post('http://challenge-react.alkemy.org/', {email, password})
    //   .catch(err => console.log(err))
    //   .then(res => {
    //     new swal({
    //       title: '<h5>Bienvenido a The Movies Database</h5>',
    //     text: 'Credenciales validos',
    //     imageUrl: 'https://thumbs.gfycat.com/ChillyFrayedAsiandamselfly-max-1mb.gif',
    //     imageHeight: "20vh",
    //     imageAlt:'back',
    //     icon: "success"});
    //     const token = res.data.token;
    //      //Storing the token in the localStorage
    //      localStorage.setItem('token', token);
    //      //Redirect to another page
    //      navigate("/listado");
    //   })
    
  }
  // Take the data of the token
  let token = localStorage.getItem('token');
  return (
    <>
      {token && <Navigate to='/listado'/>}
      <div className='container d-flex justify-content-center flex-column align-content-center align-items-center overflow-hidden' style={{height: "85%"}}>
          <form onSubmit={submitHandler} className='card d-flex flex-column align-items-center p-5 bg-dark bg-opacity-70 text-white'>
              <img style={{height: '20vh'}} alt='logo' src={logo}></img>
              <span className='fw-bold fs-5 text-white-50'>Welcome back!</span>
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
              <button className='btn btn-danger'>Continue</button>
              <Link to='/recovery' className='text-danger'>Forgot your data?</Link>
          </form>
      </div>
    </>
    
  )
}
