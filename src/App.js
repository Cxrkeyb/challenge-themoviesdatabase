import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
// Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
// Styles
import './css/App.css'
import Favoritos from "./components/Favoritos";


function App() {
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState(null);
  
  useEffect(()=>{
      const favsLocal = localStorage.getItem('favs');
      if(favsLocal != null){
          const favsArray = JSON.parse(favsLocal);
          setFavorites(favsArray);
      }
  }, [])
  useEffect(()=>{
    const tokenLocal = sessionStorage.getItem('token');
    console.log(tokenLocal);
    if(tokenLocal != null){
        setToken(tokenLocal);
    }
}, [])
  let favMovies = localStorage.getItem('favs');
  let tempMovieInFavs;

  if(favMovies === null){
    tempMovieInFavs = [];
  }else{
    tempMovieInFavs = JSON.parse(favMovies); 
  }
  const refreshToken = e =>{
    const tokenLocal = sessionStorage.getItem('token');
    setToken(tokenLocal)
  }
  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const titleMovie = parent.querySelector('h5').innerText;
    const overviewMovie = parent.querySelector('p').innerText;
    const idMovie = btn.dataset.movieid;
    const movieData = {imgURL, titleMovie, overviewMovie, id: idMovie};
    let isMovieinArray = tempMovieInFavs.find((movie) => {
      return movie.id === idMovie;
    })
    if(!isMovieinArray) {
      tempMovieInFavs.push(movieData);
      setFavorites(tempMovieInFavs);
      localStorage.setItem('favs', JSON.stringify(tempMovieInFavs));
    }else{
      let moviesLeft = tempMovieInFavs.filter((movie) => {
        return movie.id !== idMovie;
      })
      tempMovieInFavs = moviesLeft;
      setFavorites(tempMovieInFavs);
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
    }
  }
  
  return (
    <div className="App d-flex flex-column justify-content-between">
      <Header favorites={favorites} token={token}/>
      <Routes>
        <Route path="/" element={<Login refreshToken={refreshToken} />} />
        <Route path='/detalle' element={<Detalle />}/>
        <Route path='/listado' element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>}/>
        <Route path='/resultados' element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>}/>
        <Route path='/favoritos' element={<Favoritos addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
