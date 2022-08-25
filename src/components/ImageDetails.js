import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './ImageDetails.css'
import { saveAs } from 'file-saver'



const ImageDetails = ({ route, navigation }) => {

  const urlRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  const navigate = useNavigate();
  const location = useLocation();
  window.scrollTo(0, 0)

  const [descriptionImage, setDescriptionImage] = useState("");//save the description of the selected image
  const { id } = useParams();


  const [image, setImage] = useState({  //save the selected image
    url: "",
    description: "",
    key: ""
  });


  useEffect(() => {
    fetchImage();
  }, [])


  //get the image from url
  const fetchImage = () => {
    let url = `${urlRoot}/photos/${id}?client_id=${accessKey}`

    fetch(url).then(res => res.json())
      .then(response => {
        setImage({
          url: response.urls.full,
          description: response.description,
          key: response.id
        })
      }
      )
  }

  // handle the share button
  const shareHandle = () => {
    if (typeof navigator.share === 'function') {
      navigator.share({
        text: 'I would like to share a picture with you',
        url: image.url,
      })
    }
    else {
      navigator.clipboard.writeText(image.url)
    }
  }

  // handle the download button
  const downloadHandle = () => {
    saveAs(
      image.url,
      "img"
    );
  }

  // handle the back button - if the user enter from the gallery or from url
  const backButton = () => {
    if (location.state) {
      navigate(`/infinite-scroll`, {
        state: { pagePosition: location.state.pagePosition, images: location.state.images }
      });
    }
    else {
      navigate(`/infinite-scroll`);
    }
  }


  useEffect(() => {
    if (image.description == null) {
      setDescriptionImage("Sorry, we don't have a description for the photo")
    }
    else
      setDescriptionImage(image.description)
  })


  return (
    <div className="detailsPage">
      <div className="backBtnDiv">
        <button
          type="button"
          className="btn backButton"
          onClick={backButton}>&#8249; Back</button>

      </div>

      <div className="imgView">
        <img className="SelectedImg" key={image.key} src={image.url} alt="description" />
      </div>

      <div className="details">
        <div className="infoImg">
          <h5 className="descriptionTitle">Description:</h5>
          <h5 className="description">{descriptionImage}</h5>

        </div>
        <div className="shareOrDownload">
          <button
            type="button"
            className="btn shareButton"
            onClick={shareHandle}>Share
          </button>
          <button
            type="button"
            className="btn downloadButton"
            onClick={downloadHandle}>Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageDetails
