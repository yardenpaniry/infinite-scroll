import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ImageDetails from './components/ImageDetails'
import MainPage from './components/MainPage'
import React from 'react';
import './App.css';


const App = () =>{
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/imageDetails/id=:d" element={<ImageDetails/>}/>
          <Route  path="/infinite-scroll" element={<MainPage/>}/>
        </Routes>
      </div>
      <footer>

      ©️ Yarden paniry
      </footer>

    </Router>

  );
  
}

export default App;