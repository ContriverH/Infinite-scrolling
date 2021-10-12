import { React, useState } from "react";
import useBookSearch from "./useBookSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1); // doing a new query will start the page from the beginning
  }

  const { loading, books, error, hasMore } = useBookSearch(query, pageNumber);
  return (
    <>
      <input type="text" onChange={handleSearch}></input>
      {books.map((book) => (
        <div key={book}>{book}</div>
      ))}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
}
