import React, { forwardRef, useState, useEffect } from "react";
import { useStaticQuery, graphql, StaticQuery } from "gatsby"; // to query for image data
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { src } from "prettier";
import * as s from "../../css/index.module.css";
import { TOTAL_COUNT, MAIN_COUNT } from "../../utils/settings";

const ImageSequence = ({
  progress,
  images,
  vr_1,
  rawImages,
  rawVRImages,
  setEnded,
  setPreloaded,
  preloaded,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = React.useState([]);

  let index = Math.round(progress * 1 * TOTAL_COUNT);
  const [scroll, setScroll] = useState(Math.floor(progress * TOTAL_COUNT));

  useEffect(() => {
    if (index >= TOTAL_COUNT - 10) {
      setEnded(true);
    } else {
      setEnded(false);
    }
  }, [progress]);

  const reducePreloader = () => {
    // console.log('reduce preloader')
    setPreloaded(preloaded--);
  }


  if (rawImages) {
    return (
      <div style={{ position: "fixed", width: "100vw", height: "100vh" }}>
        {rawImages?.map((image, i) => {
          let img = getImage(image.node.childImageSharp.gatsbyImageData);
          return (
            <div
              style={{
                height: "100vh",
                width: "100vw",
                position: "absolute",
                pointerEvents: "none",
                display: i !== index ? "none" : "block",
              }}
              key={`core-${i}`}
              data-num={i}
            >
              <GatsbyImage
                objectFit="cover"
                objectPosition="center"
                image={img}
                loading={"eager"}
                onLoad={reducePreloader}
                alt="Funtime Unicorn"
                style={{
                  height: "100vh",
                  width: "100vw",
                }}
              />
            </div>
          );
        })}
        {rawVRImages?.map((image, i) => {
          let img = getImage(image.node.childImageSharp.gatsbyImageData);
          return (
            <div
              key={`vr-${i}`}
              style={{
                display: i + MAIN_COUNT !== index ? "none" : "block",
                height: "100%",
                width: "100%",
                position: "absolute",
                pointerEvents: "none",
              }}
            >
              <GatsbyImage
                objectFit="cover"
                objectPosition="center"
                image={img}
                loading="eager"
                onLoad={reducePreloader}
                alt="Funtime Unicorn"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <>Loading</>;
  }
};

export default ImageSequence;
