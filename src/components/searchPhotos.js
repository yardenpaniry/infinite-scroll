import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import { Gallery } from "./Gallery"

export default function SearchPhotos({userSubmit}) {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    console.log(query);

    const searchPhotos = async (e) => {
        e.preventDefault();
        userSubmit(query)
    };

    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
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
      
        </>
    );
}