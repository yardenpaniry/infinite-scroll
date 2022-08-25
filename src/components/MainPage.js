import React, { useState, useEffect } from 'react';
// import "./App.css";
import SearchPhotos from "./searchPhotos"
import { Gallery } from "./Gallery"
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

  const [images, setImages] = useState([]);               //save the images that show
  const [searchWords, setSearchWords] = useState("");     //save the words that the user search
  const [pageNumber, setPageNumber] = useState(1);        //every scroll need to get the next page

  const scroll = Scroll.animateScroll;

  const location = useLocation();
  const navigate = useNavigate();

  window.onbeforeunload = (e) => {                        //handle when user refresh the web 
    navigate(location.pathname, {});
  };



  useEffect(() => {

    setHeight(ref.current.clientHeight)                             //save the height of the header


    let position = 0;
    if (location.state != undefined || location.state != null) {
      position = location.state.pagePosition
      setImages([...location.state.images])

      if (position > 0) {
        scroll.scrollTo(position);                                  //if user press the back button in details page

        position = 0;
      }
    }
    else
      fetchImages();
  }, []);


  //get the images from the API
  const fetchImages = () => {
    if (searchWords != "") {

      let url = `${urlRoot}/search/photos?query=${searchWords}&page=${pageNumber}&per_page=30&client_id=${accessKey}`

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
      let url = `${urlRoot}/photos/random?&client_id=${accessKey}&count=10`

      fetch(url).then(res => res.json())
      .then(data => {
          setImages([...images, ...data]);
      })
  
    }
  }

  //handle the search results when the user clicks on the search button
  const onSearchSubmit = (input) => {

    if (input !== "") {
      let url = `${urlRoot}/search/photos?query=${input}&per_page=30&client_id=${accessKey}`

      fetch(url).then(res => res.json())
        .then(data => {

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
    <div className="AppPage" id="AppPage">
      <div className="container">
        <div className="header" ref={ref}>
          <h1 className="title">Photo Search</h1>
          <SearchPhotos userSubmit={onSearchSubmit} />
        </div>
        <div id="content" style={{ marginTop: height }}>
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