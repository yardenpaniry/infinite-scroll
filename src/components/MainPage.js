import React, { useState, useEffect } from 'react';
// import "./App.css";
import SearchPhotos from "./searchPhotos"
import { Gallery } from "./Gallery"
import axios from "axios";
import InfinitScroll from 'react-infinite-scroll-component'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import * as Scroll from 'react-scroll';

const MainPage = () => {
  const urlRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  const [images, setImages] = useState([]);
  const [searchWords, setSearchWords] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const scroll    = Scroll.animateScroll;

  const location = useLocation();
  const navigate = useNavigate();

  window.onbeforeunload = (e) => {
    navigate(location.pathname, {});
  };



  useEffect(() => {
  
    setHeight(ref.current.clientHeight)
    let position = 0;
    if (location.state != undefined || location.state != null) {
      position = location.state.pagePosition
      setImages([...location.state.images])

      if (position > 0) {
        console.log("positionTo: " + position)

        scroll.scrollTo(position);

        position = 0;
      }
    }
    else
      fetchImages();
  }, []);



  const fetchImages = () => {
    if (searchWords != "") {
      console.log("searchWords: " + searchWords)

      let url = `${urlRoot}/search/photos?query=${searchWords}&page=${pageNumber}&per_page=10&client_id=${accessKey}`

      fetch(url).then(res => res.json())
        .then(response => {
          setImages([...images, ...response.results]);
          if (pageNumber < response.total_pages) {
            setPageNumber(pageNumber + 1);
          }
        }

        )
    }
    else {
      let url = `${urlRoot}/photos/random?client_id=${accessKey}&count=10`
      console.log(url)

      axios.get(`${urlRoot}/photos/random?client_id=${accessKey}&count=10`)
        .then(response => setImages([...images, ...response.data]))
    }
  }
  const onSearchSubmit = (input) => {

    console.log(`${urlRoot}/search/photos?query=${input}&per_page=10&client_id=${accessKey}`)
    if (input !== "") {
      let url = `${urlRoot}/search/photos?query=${input}&per_page=10&client_id=${accessKey}`

      fetch(url).then(res => res.json())
        .then(data => {
          console.log("data.total_pages: " + data.total_pages)

          if (data.total_pages == 0) {
            toast.error("No images found related to '" + input + "'", {
              position: toast.POSITION.TOP_CENTER
            })

          }
          else {
            setSearchWords(input)
            setImages([...data.results]);
            if (pageNumber < data.total_pages) {
              setPageNumber(pageNumber + 1);
            }
          }

        })
    }
  }

  return (
    <div className="AppPage"  id="AppPage">
      <div className="container">
        <div className="header" ref={ref}>
          <h1 className="title">Photo Search</h1>
          <SearchPhotos userSubmit={onSearchSubmit} />
        </div>
        <div id="content" style={{
          marginTop: height
        }}>


          <InfinitScroll
            dataLength={images.length}
            next={fetchImages}
            hasMore={true}
          >
            <Gallery images={images} />
          </InfinitScroll>

        </div>
      </div>

      <ToastContainer />

    </div>
  );
}
export default MainPage;