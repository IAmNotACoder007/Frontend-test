import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { QuoteModal } from "./QuoteModal";

export function Quote() {
  const [requestingQuote, setRequestingQuote] = useState(false);
  const quoteRequestQueue = useRef(true);
  const authorRequestQueue = useRef(true);
  const {
    data: author,
    isRefetching: loadingAuthor,
    refetch,
  } = useQuery({
    queryKey: ["author"],
    enabled: false,
    cacheTime: 0,
    queryFn: () =>
      axios.get(`http://localhost:5000/author/1`).then((res) => {
        handleRequestQuote();
        return res.data;
      }),
  });

  // Then get the user's projects
  const {
    isRefetching: loadingQuote,
    data: quote,
    refetch: refetchQuote,
  } = useQuery({
    queryKey: ["quote"],
    cacheTime: 0,
    queryFn: () => {
      return axios
        .get(`http://localhost:5000/quote/${author?.id}`)
        .then((res) => {
          handleCancel();
          return res.data;
        });
    },
    // The query will not execute until the userId exists
    enabled: false,
  });

  let apiPromise = useRef(0);

  const handleCancel = useCallback(() => {
    clearTimeout(apiPromise.current); // cancel the call
    authorRequestQueue.current = true;
    quoteRequestQueue.current = true;
    setRequestingQuote(false);
  }, []);

  const handleRequestQuote = useCallback(() => {
    quoteRequestQueue.current = true;
    apiPromise.current = window.setTimeout(() => {
      refetchQuote();
      quoteRequestQueue.current = false;
    }, 5000);
  }, [refetchQuote]);

  const handleRequestAuthor = useCallback(() => {
    authorRequestQueue.current = true;
    setRequestingQuote(true);
    apiPromise.current = window.setTimeout(() => {
      refetch();
      authorRequestQueue.current = false;
    }, 5000);
  }, [refetch]);

  return (
    <div className="app-quote">
      <Button onClick={handleRequestAuthor} type="primary">
        Update
      </Button>
      <QuoteModal
        authorLoaded={author && !loadingAuthor && !authorRequestQueue.current}
        quoteLoaded={quote && !loadingQuote && !quoteRequestQueue.current}
        onCancel={handleCancel}
        open={requestingQuote}
      />
    </div>
  );
}
