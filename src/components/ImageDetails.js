import React , { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './ImageDetails.css'
import { saveAs } from 'file-saver'



const ImageDetails = ({ route, navigation }) => {

  const navigate = useNavigate();
  const location = useLocation();
  window.scrollTo(0, 0)

  const SelectedImgStr = location.state.SelectedImgStr;
  const SelectedImgObj = JSON.parse(SelectedImgStr);

  const [descriptionImage, setDescriptionImage] = useState("");


  console.log(SelectedImgObj)

  const shareHandle = () => {
    if (typeof navigator.share === 'function') {
      navigator.share({
        text: 'I would like to share a picture with you',
        url: SelectedImgObj.urls.full,
      })
    }
    else {
      navigator.clipboard.writeText(SelectedImgObj.urls.full)
    }
  }
  const downloadHandle = () => {
    saveAs(
      SelectedImgObj.urls.full,
      "img"
    );
  }
  const backButton = () => {
    console.log("image scrollPosition: " + location.state.pagePosition)

    navigate(`/infinite-scroll`, {
      state: { pagePosition: location.state.pagePosition, images: location.state.images }
    });



  }
  useEffect(() => {
    if (SelectedImgObj.description == null) {
      setDescriptionImage("Sorry, we don't have a description for the photo")
    }
    else  
    setDescriptionImage(SelectedImgObj.description)
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
        <img className="SelectedImg" key={SelectedImgObj.key} src={SelectedImgObj.urls.full} alt="description" />
      </div>

      <div className="details">
        <div className="infoImg">
          <h5>Description: {descriptionImage}</h5>

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
