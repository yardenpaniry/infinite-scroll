import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const Gallery = ({ images }) => {

  const navigate = useNavigate();
  const [pagePosition, setPagePosition] = useState(0);

  const [SelectedImg, setSelectedImg] = useState([]); /* image clicked by the user */


  const handleClick = (event, image) => {

    setSelectedImg(image);
    setPagePosition(window.pageYOffset)

    if (SelectedImg.length !== 0) {

      let SelectedImgStr = JSON.stringify(SelectedImg);

      // console.log(SelectedImgStr);
      navigate(`/imageDetails/${SelectedImg.id}`, {
        state: { SelectedImgStr: SelectedImgStr, images: images , pagePosition: pagePosition }
      });
    }

  };



  return (

    <div className="card-list">
      {
        images.map((image) =>
          <div className="card" key={image.id}>
            <img
              className="card--image"
              alt={image.alt_description}
              src={image.urls.thumb}
              width="50%"
              height="50%"
              onClick={(event) => handleClick(event, image)}

            ></img>
          </div>)
      }
    </div>

    // <div>

    //         {images.map(images =>
    //            <img src={images.urls.full} key={images.key} alt="" />
    //         )}


    //       </div> 
    // <img src={url} key={key} alt="" />
  )
}
