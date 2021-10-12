import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query, pageNumber) {
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
    }).then((res) => {
      console.log(res.data);
    });
  }, [query, pageNumber]);
  return null;
}
