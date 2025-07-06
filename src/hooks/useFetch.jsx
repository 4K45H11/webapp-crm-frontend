import { useState, useEffect } from "react";

const useFetch = (initUrl) => {
  const [url, setUrl] = useState(initUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [errorMsg,setErrorMsg] = useState()

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(true);
        setErrorMsg(err.message)
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchUrl();
  }, [url]);

  return { loading, data, error, setUrl,errorMsg };
};

export default useFetch;
