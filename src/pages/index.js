import cx from "classnames";
import React, { useState, useRef, useEffect } from "react";
import useScrollPosition from '@react-hook/window-scroll'
import Main from "../../static/main_trim_lores.mp4";
import VR_1 from "../../static/vr_1_lores.mp4";
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

const coreLength = 799;
const vrLength = 354;
const totalLength = coreLength + vrLength;

const sortStringInts = (array) => {
  array.sort(function (a, b) {
    let aBase = a.node.base.split(".jpg")[0];
    let bBase = b.node.base.split(".jpg")[0];
    return Number(aBase) - Number(bBase);
  });
  return array;
};

export default function IndexPage({ data }) {
  // Refs
  const mainVideo = useRef();
  const scrollY = useScrollPosition(60)
  // Scroll Direction
  const { scrollDirection, isScrolling, isScrollingUp, isScrollingDown } =
    useScrollDirection();
  //Preloader
  const [preloaded, setPreloaded] = useState(totalLength);
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
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: null,
    y: null,
  });

  const images = sortStringInts(data?.core?.edges);
  const vr_1 = sortStringInts(data?.vr_1?.edges);


  var imageData = [];
  for (let i = 1; i < coreLength; i++) {
    imageData.push(`/frames/${i}.jpg`);
  }

  var vr_1Data = [];
  for (let i = 1; i < vrLength; i++) {
    vr_1Data.push(`/vr_1/${i}.jpg`);
  }

  var allImages = [];
  images.map((img)=>{
    allImages.push(img.node.publicURL)
    // allImages.push(img.node.childImageSharp.gatsbyImageData.images.fallback.src)
  });
  vr_1.map((img)=>{
    allImages.push(img.node.publicURL)
    // allImages.push(img.node.childImageSharp.gatsbyImageData.images.fallback.src)
  });


  console.log(images);


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
      // Your custom logic here
      console.log("scroll down");
      window.scrollBy(0, 30);
      // console.log(window.scrollY)
    },
    // Delay in milliseconds or null to stop it
    mouseDown && !ended ? 30 : null
  );

  const onMainEnded = () => {
    // play random VR video
    console.log("mainEnded");
    setMainEnded(true);
  };

  const onClick = () => {};

  const onMouseDown = () => {
    setPlaying(true);
    setMouseDown(true);
    setTitle(false);
    // autoScroll();
  };

  const autoScroll = () => {
    // if (intervalId) {
    //   clearInterval(intervalId);
    //   setIntervalId(0);
    // }
    // setIntervalId(
    //   setInterval(() => {
    //     console.log("tick down");
    //     if (!ended) {
    //       window.scrollBy(0, 60);
    //     } else {
    //       setPlaying(false);
    //       clearInterval(intervalId);
    //     }
    //   }, 30)
    // );
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

  const winScroll = () => {
    // console.log('mouseDown', mouseDown)
  };

  const autoScrollUp = () => {
    // console.log("autoScrollUp");
    // //clear any current intervals
    // if (intervalId) {
    //   clearInterval(intervalId);
    //   setIntervalId(0);
    // }
    // // set new interval
    // setIntervalId(
    //   setInterval(() => {
    //     console.log("tick up");
    //     console.log("isScrolling", isScrolling);
    //     if (
    //       (scrollDirection === "NONE" || scrollDirection === "UP") &&
    //       !isScrolling &&
    //       window.scrollY > 0
    //     ) {
    //       window.scrollBy(0, -60);
    //     } else {
    //       clearAll();
    //     }
    //   }, 30)
    // );
  };

  const clearAll = () => {
    console.log("clearAll");
    clearInterval(intervalId);
    setIntervalId(0);
    // console.log('clear all');
    // setMouseDown(false);
    // setPlaying(false);
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
      {/* {preloaded > 0 && <section className={s.preloader}>
        Loading images: {preloaded}
      </section> */}

      <Controller>
        <Scene duration="4000%">
          {(progress) => {
            let index = Math.round(progress * 1 * totalLength);
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
                  {/* <Sequence
                    images={imageData}
                    rawImages={images}
                    rawVRImages={vr_1}
                    progress={progress}
                    vr_1={vr_1Data}
                    setEnded={setEnded}
                    setPreloaded={setPreloaded}
                    preloaded={preloaded}
                  /> */}
                  <CanvasSequence totalLength={totalLength} setEnded={setEnded} index={index} images={allImages} style={{height: '1400px'}} />
                </div>
                <Content ended={ended} setEnded={setEnded} />
              </>
            );
          }}
        </Scene>
      </Controller>

      {/* <div className={cx(s.text, s.bodyText, { [s.textHidden]: !vrEnded })}>
        <header className={s.header}>
          <h1 className={s.h1}>FUNTIME UNICORN</h1>
          <p className={s.authorText}>By Derrick Adams</p>
        </header>
        <nav className={cx(s.nav, s.bodyText)}>
          <button className={s.bodyText}>About</button>
          <button className={s.bodyText}>Gallery</button>
          <button className={s.bodyText}>3D Viewer</button>
          <button className={s.bodyText}>Share</button>
        </nav>
        <div className={s.textContainer}>
          <section className={s.section}>
            <article>
              Derrick Adams’ new edition, brings to life not only the imagery he
              is known for, but also the bodily experiences it is meant to
              capture. Each sculpture in the edition is a real-life
              manifestation of Adams’ signature iconography; a visual vocabulary
              composed of objects, symbols, colors, and shapes, all of which are
              recontextualized in order to depict leisure in an unprecedented
              way while simultaneously illuminating the inherent role
              consumerism plays in such moments of fun and relief. The edition
              draws from Adams’ Floaters series, which includes vivid portraits
              of Black people in various states of rest and play. Mounted atop
              colorful unicorns or candy shaped plastic floaties popularized in
              recent years, the figures represent an updated version of
              contemporary American iconography. Now extended further into the
              grasp of individuals, FUNTIME UNICORN provides a new way to
              experience the emotions evoked by Adams’ paintings.
            </article>
            <article>
              This is the gallery section
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </article>
            <article>This is the 3D Viewer section</article>
            <article>This is the share section</article>
          </section>
        </div>
      </div> */}
    </main>
  );
}

export const query = graphql`
  query {
    core: allFile(filter: { relativeDirectory: { in: "frames" } }) {
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
    vr_1: allFile(filter: { relativeDirectory: { in: "vr_1" } }) {
      edges {
        node {
          id
          base
          publicURL
          childImageSharp {
            gatsbyImageData(
              quality: 100
              formats: [AUTO, WEBP]
              width: 1280
              height: 720
              blurredOptions: { width: 100, toFormat: JPG }
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`;
