import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GalleryGrid from 'react-grid-gallery';



export const Gallery = ({ images }) => {

  const navigate = useNavigate();
  let IMAGES = []

  images.forEach(img => {
    IMAGES.push(    /*build array of images for Gallery component*/
      {
        src: img.urls.regular,
        thumbnail: img.urls.small,
        thumbnailWidth: img.width,
        thumbnailHeight: img.height,
        caption: img.alt_description,
        key: img.id
      })
  });
  const handleClick = (index) => {
   
    navigate(`/imageDetails/id=${IMAGES[index].key}`, {
      state: { SelectedImg: IMAGES[index], images: images, pagePosition: window.pageYOffset }
    });
    // }
  };

  return (
    <GalleryGrid images={IMAGES}
      enableImageSelection={false}
      enableLightbox={false}
      onClickThumbnail={handleClick}
      margin={3} />
    // <div className="card-list">
    //   {
    //     images.map((image) =>
    //       <div className="card" key={image.id}>
    //         <img
    //           className="card--image"
    //           alt={image.alt_description}
    //           src={image.urls.thumb}
    //           width="50%"
    //           height="50%"
    //           onClick={(event) => handleClick(event, image)}

    //         ></img>
    //       </div>)
    //   }
    // </div>

  )
}
