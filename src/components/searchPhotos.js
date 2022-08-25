import React, { useState } from "react";


export default function SearchPhotos({userSubmit}) {
    const [query, setQuery] = useState("");

    const searchPhotos = async (e) => {
        // window.scrollTo(0, 0)
        e.preventDefault();
        userSubmit(query)
        console.log(query)
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