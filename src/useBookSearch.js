import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([...prevBooks, ...res.data.docs.map((b) => b.title)]), // this is to filter out the duplicate entries and then converting them back to the list
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        // this catch needs to be implemented, because after each cancellation there is an event cancellation error in the console.
        if (axios.isCancel()) return; // axios provides isCancel() to check if the cancel() is envoked or not.
        setError(true);
      });
    return () => cancel(); // this will be called first after rerendering
  }, [query, pageNumber]);
  return { loading, books, error, hasMore };
}
