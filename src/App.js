import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageDetails from "./components/ImageDetails";
import MainPage from "./components/MainPage";
import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";

const App = () => {
  const [heightHeader, setHeight] = useState(0);

  return (
    <Router>
      <div className="App">
        <Header setHeight={setHeight}></Header>

        <Routes>
          <Route exact path="/imageDetails/id=:id" element={<ImageDetails />} />
          <Route
            path="/infinite-scroll"
            element={<MainPage heightHeader={heightHeader} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
