import React from 'react'
import { useHistory} from 'react-router-dom';


export const Gallery = ({ images}) => {
  return (

    <div className="card-list">
      {
        images.map((image) =>
          <div className="card" key={image.id}>
            <img
              className="card--image"
              alt={image.alt_description}
              src={image.urls.full}
              width="50%"
              height="50%"
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
