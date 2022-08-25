import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Gallery = ({ images }) => {

  const navigate = useNavigate();

  const handleClick = (event, image) => {

    if (image.length !== 0) {

      let SelectedImgStr = JSON.stringify(image);

      navigate(`/imageDetails/id=${image.id}`, {
        state: { SelectedImgStr: SelectedImgStr, images: images , pagePosition: window.pageYOffset }
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

  )
}
