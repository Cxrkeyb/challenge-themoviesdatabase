import { Routes, Route } from "react-router-dom";
// Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
// Styles
import './css/App.css'

function App() {
  return (
    <div className="App d-flex flex-column justify-content-between">
      {<Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/listado' element={<Listado />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;