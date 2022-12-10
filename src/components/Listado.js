import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Listado() {
    
    let navigate = useNavigate();
    // When the page is loaded check the token
    useEffect(() => {
        // Take the token of localStorage
        let token = localStorage.getItem('token');
        // If the token is null, then navigate to the main page
        if(token == null){
          navigate("/");
        }
      }); 
  return (
    <div>Listado</div>
  )
}
