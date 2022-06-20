import React, { forwardRef, useState, useEffect } from "react";
import { useStaticQuery, graphql, StaticQuery } from "gatsby"; // to query for image data
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { src } from "prettier";
import * as s from "../../css/index.module.css";

const coreLength = 799;
const vrLength = 354;

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

  const totalLength = coreLength + vrLength;
  let index = Math.round(progress * 1 * totalLength);
  const [scroll, setScroll] = useState(Math.floor(progress * totalLength));

  useEffect(() => {
    if (index >= coreLength + vrLength - 1) {
      setEnded(true);
    } else {
      setEnded(false);
    }
  }, [progress]);

  const reducePreloader = () => {
    // console.log('reduce preloader')
    setPreloaded(preloaded--);
  }

  useEffect(()=>{
    // console.log('totalLength - preloaded', totalLength - preloaded)
    // console.log('preloaded', preloaded)
  }, [preloaded])

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
                display: i + coreLength !== index ? "none" : "block",
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
