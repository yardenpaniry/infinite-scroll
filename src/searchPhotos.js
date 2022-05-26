import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: "TbJ5rvOhg1N-lBWjlNQYHXd5lEJyuymqKUS5ImUiDqs",
});

export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  console.log(query);

  const searchPhotos = async (e) => {
    e.preventDefault();
    console.log("Submitting the Form")
  };

  return (
    <>
    <form className="form"  onSubmit={searchPhotos}> 
        <label className="label" htmlFor="query"> 
            {" "}
            📷
        </label>
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