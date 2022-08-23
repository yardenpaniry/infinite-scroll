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



const MainPage = () => {

  const urlRoot = "http://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  const [images, setImages] = useState([]);
  const [searchWords, setSearchWords] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  window.onbeforeunload = (e) => {
    navigate(location.pathname, {}); 
  };
  useEffect(() => {
    let position = 0;
    if (location.state != undefined || location.state != null) {
      position = location.state.pagePosition
      setImages([...location.state.images])
      setScrollPosition(position)

      if (position > 0) {
        console.log("טשרגקמ: " + position)

        window.scrollTo(0, position);
  
        position = 0;
      }
    }
    else
      fetchImages();
  }, []);

  useEffect(() => {
    if (scrollPosition > 0) {
      // if (document.documentElement.clientWidth > 1000)
      //     window.scrollTo(0, scrollPosition + 200); //offest for larger width screen
      // else
      console.log("טשרגקמ: " + scrollPosition)

      window.scrollTo(0, scrollPosition);

      setScrollPosition(0); //reset

    }
  }, []);

  const fetchImages = () => {
    if (searchWords != "") {
      console.log("searchWords: " + searchWords)
      // axios.get(`${urlRoot}/search/photos?query=${searchWords}&per_page=10&client_id=${accessKey}`)
      //   .then(response => setImages([...images, ...response.data]))
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

      // fetch(url).then(res => res.json())
      // .then(response => setImages([...images, ...response.data]))
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
    <div className="App">
      <div className="container">
        <h1 className="title">Photo Search</h1>
        <SearchPhotos userSubmit={onSearchSubmit} />

        <InfinitScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={true}
        >
          <Gallery images={images} />
        </InfinitScroll>
      </div>

      <ToastContainer />

    </div>
  );
}
export default MainPage;