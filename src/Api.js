// import { baseUrl } from "../config";
const baseUrl = "https://api.unsplash.com";

export const fetchImages = (
  images,
  searchWords,
  pageNumber,
  setImages,
  setPageNumber
) => {
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  if (searchWords != "") {
    let url = `${baseUrl}/search/photos?query=${searchWords}&page=${pageNumber}&per_page=50&client_id=${accessKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setImages([...images, ...response.results]);
        if (pageNumber < response.total_pages) {
          setPageNumber(pageNumber + 1);
        }
      });
  } else {
    let url = `${baseUrl}/photos/random?&client_id=${accessKey}&count=30`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImages([...images, ...data]);
      });
  }
};
