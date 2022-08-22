import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import { Gallery } from "./Gallery"

const accessKey = process.env.REACT_APP_ACCESSKEY;

const unsplash = new Unsplash({
    accessKey: accessKey,
});

export default function SearchPhotos() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    console.log(query);

    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search
            .photos(query)
            .then(toJson)
            .then((json) => {
                setImages(json.results);
                console.log(json);
            });
        console.log("Submitting the Form")
    };

    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                {/* <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label> */}
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
            {/* <div className="card-list">
                {
                    pics.map((pic) =>
                        <div className="card" key={pic.id}>
                            <img
                                className="card--image"
                                alt={pic.alt_description}
                                src={pic.urls.full}
                                width="50%"
                                height="50%"
                            ></img>
                        </div>)
                }
            </div> */}
            <Gallery images={images}/>
        </>
    );
}