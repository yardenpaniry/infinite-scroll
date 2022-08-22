import React, { useState, useEffect } from 'react';
// import "./App.css";
import SearchPhotos from "./searchPhotos"
import { Gallery } from "./Gallery"
import axios from "axios";
import InfinitScroll from 'react-infinite-scroll-component'


function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    const apiRoot = "http://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios.get(`${apiRoot}/photos/random?client_id=${accessKey}&count=25`)
      .then(response => setImages([...images, ...response.data]))
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Photo Search</h1>
        <SearchPhotos />

        <InfinitScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={true}
        >
          <Gallery images={images} />




        </InfinitScroll>





      </div>
    </div>
  );
}
export default App;