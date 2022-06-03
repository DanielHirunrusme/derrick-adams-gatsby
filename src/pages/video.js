import cx from "classnames"
import React, { useState, useRef } from "react"
import Main from "../../static/main_trim_lores.mp4"
import VR_1 from "../../static/vr_1_lores.mp4"
import * as s from "../css/video.module.css"
import ReactPlayer from "react-player"

export default function Video() {
  // Refs
  const mainVideo = useRef()
  // States
  const [playing, setPlaying] = useState(false)
  const [title, setTitle] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [mainEnded, setMainEnded] = useState(false)
  const [vrEnded, setVrEnded] = useState(false)


  const onMainEnded = () => {
    // play random VR video
    console.log("mainEnded")
    setMainEnded(true)
  }

  const onClick = () => {}

  const onMouseDown = () => {
    setPlaying(true)
    setTitle(false)

    if(!vrEnded) {
      setPlaying(true)
    } else {
      setMainEnded(false);
      setVrEnded(false);
      mainVideo.current.player.seekTo(0, 'seconds')
    }

    // if (intervalId) {
    //   clearInterval(intervalId)
    //   setIntervalId(0)
    // }
  }

  const onMouseUp = () => {
    setPlaying(false)
    // if (intervalId) {
    //   clearInterval(intervalId);
    //   setIntervalId(0);
    //   return;
    // }
    // const newIntervalId = setInterval(() => {
    //   console.log(mainVideo.current)
    //   let rwdTime = mainVideo.current.player.getCurrentTime() - .25;
    //   // let time = mainVideo.player.getCurrentTime() - 1;
    //   if(rwdTime > 0) {
    //     console.log('rwdTime', rwdTime);
    //     mainVideo.current.player.seekTo(rwdTime, 'seconds')
    //   } else {
    //     mainVideo.current.player.seekTo(0, 'seconds')
    //     clearInterval(newIntervalId)
    //     setIntervalId(0);
    //   }
    // }, 30);

    // setIntervalId(newIntervalId);
  }

  const onVrEnded = () => {
    setVrEnded(true);
  }

  return (
    <main className={s.main}>
      <button
        // onClick={onClick}
        onClick={onMouseDown}
        // onMouseUp={onMouseUp}
        className={s.button}
      >{!vrEnded ? "Play" : "Replay?" }</button>
      <div className={cx(s.title, { [s.titleHidden]: !title })}>
        <div>
          <h1  className={s.h1}>FUNTIME UNICORN</h1>
          <p className={cx(s.bodyText, s.authorText)}>By Derrick Adams</p>
        </div>
      </div>
      <div className={cx(s.video, { [s.videoHidden]: mainEnded })}>
        <ReactPlayer
          ref={mainVideo}
          onEnded={onMainEnded}
          width="100%"
          height="100%"
          volume={0}
          playing={playing}
          playsinline={true}
          url={Main}
          muted={true}
          controls={false}
        />
      </div>
      <div className={cx(s.video, { [s.videoHidden]: !mainEnded })}>
        <ReactPlayer
          onEnded={onVrEnded}
          playing={mainEnded}
          width="100%"
          height="100%"
          volume={0}
          playsinline={true}
          url={VR_1}
          muted={true}
          controls={false}
        />
      </div>
      <div className={cx(s.text, s.bodyText,  { [s.textHidden]: !vrEnded })}>
        <header className={s.header}>
          <h1 className={s.h1}>FUNTIME UNICORN</h1>
          <p className={s.authorText}>By Derrick Adams</p>
        </header>
        <nav className={s.nav}>
            <button>About</button>
            <button>Gallery</button>
            <button>3D Viewer</button>
            <button>Share</button>
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
            <article>
              This is the 3D Viewer section
            </article>
            <article>
              This is the share section
            </article>
          </section>
        </div>
      </div>
    </main>
  )
}
