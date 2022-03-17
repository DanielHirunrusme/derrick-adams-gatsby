import { useState, useEffect } from "react";

const defaultState = { image: undefined, status: "loading" };
export const useImage = (url, crossOrigin) => {
  const [res, setRes] = useState(defaultState);
//   const image = res[0].image;
//   const status = res[0].status;

  useEffect(() => {
    if (!url) return;
    const img = document.createElement("img");

    function onload() {
      setRes({ image: img, status: "loaded" });
    }

    function onerror() {
      setRes({ image: undefined, status: "failed" });
    }

    img.addEventListener("load", onload);
    img.addEventListener("error", onerror);
    crossOrigin && (img.crossOrigin = crossOrigin);
    img.src = url;

    return () => {
      img.removeEventListener("load", onload);
      img.removeEventListener("error", onerror);
      setRes(defaultState);
    };
  }, [url, crossOrigin]);

  // return array because it it better to use in case of several useImage hooks
  // const [background, backgroundStatus] = useImage(url1);
  // const [patter] = useImage(url2);
  return [res.image, res.status];
};
