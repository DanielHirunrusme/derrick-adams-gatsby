import cx from "classnames";
import React, { useState, useRef, useEffect } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import * as s from "../css/index.module.css";
import Button from "../components/button";
import { Controller, Scene } from "react-scrollmagic";
import Sequence from "../components/Sequence";
import CanvasSequence from "../components/CanvasSequence";
import Content from "../components/Content";
import Title from "../components/Title";
import { graphql } from "gatsby"; // to query for image data
import { getImage } from "gatsby-plugin-image";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import { useScrollDirection } from "use-scroll-direction";
import useInterval from "../utils/useInterval";
import { MAIN_COUNT, VR_COUNT, TOTAL_COUNT } from "../utils/settings";

const sortStringInts = (array) => {
  array.sort(function (a, b) {
    let aBase = a.node.base.split(".jpg")[0];
    let bBase = b.node.base.split(".jpg")[0];
    return Number(aBase) - Number(bBase);
  });
  return array;
};

const getRandomVR = () => {
  return Math.floor(Math.random() * (3 - 1));
};

export default function IndexPage({ data }) {
  // Refs
  const mainVideo = useRef();
  const scrollY = useScrollPosition(60);
  // Scroll Direction
  const { scrollDirection, isScrolling, isScrollingUp, isScrollingDown } =
    useScrollDirection();
  //Preloader
  const [preloaded, setPreloaded] = useState(TOTAL_COUNT);
  // States
  const [mouseDown, setMouseDown] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);
  const [title, setTitle] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [mainEnded, setMainEnded] = useState(false);
  const [vrEnded, setVrEnded] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: null,
    y: null,
  });

  const getRandVR = () => {
    let num = Math.floor(Math.random() * (4 - 1) + 1);

    switch (num) {
      case 1:
        return sortStringInts(data?.vr_1?.edges);
        break;

      case 2:
        return sortStringInts(data?.vr_2?.edges);
        break;

      case 3:
        return sortStringInts(data?.vr_3?.edges);
        break;
    }
  };

  useEffect(() => {
    const images = sortStringInts(data?.core?.edges);
    const vr = getRandVR();
  
    images.map((img) => {
      setAllImages(allImages.push(img.node.publicURL));
    });
    vr.map((img) => {
      setAllImages(allImages.push(img.node.publicURL));
    });
  }, [])

  useInterval(
    () => {
      // Your custom logic here
      window.scrollBy(0, -30);
      // console.log(window.scrollY)
    },
    // Delay in milliseconds or null to stop it
    !playing && !ended && scrollY > 30 ? 30 : null
  );

  useInterval(
    () => {
      window.scrollBy(0, 30);
    },
    // Delay in milliseconds or null to stop it
    mouseDown && !ended ? 30 : null
  );

  const onMainEnded = () => {
    // play random VR video
    setMainEnded(true);
  };

  const onMouseDown = () => {
    setPlaying(true);
    setMouseDown(true);
    setTitle(false);
  };

  const onMouseUp = () => {
    setMouseDown(false);
    if (!ended) {
      setPlaying(false);
    }
  };

  const onMouseMove = (e) => {
    if (typeof window) {
      window.innerWidth > 768
        ? setMouseCoordinates({ x: e.clientX, y: e.clientY })
        : setMouseCoordinates({ x: "auto", y: "auto" });
    }
  };

  const onVrEnded = () => {
    setVrEnded(true);
  };

  const aboutClick = (e) => {
    e.preventDefault();
    setEnded(true);
    setPlaying(true);
    if (typeof window) {
      let offset =
        document.getElementById("About").offsetTop - window.innerHeight / 2;
      window.scrollTo({
        top: offset,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const clearAll = () => {
    // console.log("clearAll");
    clearInterval(intervalId);
    setIntervalId(0);
  };

  useEffect(() => {
    if (!ended) {
      switch (scrollDirection) {
        case "DOWN":
          setPlaying(true);
          break;
        case "UP":
          setPlaying(false);
          break;
        case "NONE":
          setPlaying(false);
          break;
      }
    } else {
      setPlaying(false);
    }
  }, [scrollDirection]);

  return (
    <main onMouseMove={onMouseMove} className={s.main}>
      <Controller>
        <Scene duration="4000%">
          {(progress) => {
            let index = Math.round(progress * 1 * TOTAL_COUNT);
            return (
              <>
                <div style={{ height: "4000vh", position: "relative" }}>
                  <Title
                    playing={playing}
                    setEnded={setEnded}
                    ended={ended}
                    progress={progress}
                    index={index}
                  />
                  <Button
                    onTouchStart={onMouseDown}
                    onTouchEnd={onMouseUp}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    mouseCoordinates={mouseCoordinates}
                    progress={progress}
                    playing={playing}
                    ended={ended}
                  />
                  {allImages && <CanvasSequence
                    setEnded={setEnded}
                    index={index}
                    images={allImages}
                    style={{ height: "1400px" }}
                  />}
                </div>
                <Content ended={ended} setEnded={setEnded} />
              </>
            );
          }}
        </Scene>
      </Controller>
    </main>
  );
}

export const query = graphql`
  query {
    core: allFile(filter: { relativeDirectory: { in: "main" } }) {
      edges {
        node {
          id
          base
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 1280
              height: 720
              quality: 100
              formats: [AUTO, WEBP]
              blurredOptions: { width: 100, toFormat: JPG }
              placeholder: BLURRED
            )
          }
        }
      }
    }
    vr_3: allFile(filter: { relativeDirectory: { in: "bridge" } }) {
      edges {
        node {
          id
          base
          publicURL
          childImageSharp {
            gatsbyImageData(
              quality: 90
              formats: [AUTO, WEBP]
              width: 1600
              height: 900
              blurredOptions: { width: 100, toFormat: JPG }
              placeholder: BLURRED
            )
          }
        }
      }
    }
    vr_2: allFile(filter: { relativeDirectory: { in: "park" } }) {
      edges {
        node {
          id
          base
          publicURL
          childImageSharp {
            gatsbyImageData(
              quality: 90
              formats: [AUTO, WEBP]
              width: 1600
              height: 900
              blurredOptions: { width: 100, toFormat: JPG }
              placeholder: BLURRED
            )
          }
        }
      }
    }
    vr_1: allFile(filter: { relativeDirectory: { in: "beach" } }) {
      edges {
        node {
          id
          base
          publicURL
          childImageSharp {
            gatsbyImageData(
              quality: 90
              formats: [AUTO, WEBP]
              width: 1600
              height: 900
              blurredOptions: { width: 100, toFormat: JPG }
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`;
