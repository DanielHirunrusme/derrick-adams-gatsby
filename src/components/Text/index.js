import React, { forwardRef, useEffect, useState, useRef } from "react"
import * as s from "../../css/index.module.css"

const Text = ({ progress }) => {
  const [leftPos, setLeftPos] = useState(0)
  const ref = useRef()

  useEffect(() => {
    let ww = typeof window ? window.innerWidth : 0
    setLeftPos(Math.floor(progress * ref.current.offsetWidth))
  }, [progress])
  return (
    <article
      style={{
        transform: `translateX(-${leftPos}px)`,
        position: "fixed",
        bottom: "-.05em",
        left: 0,
        zIndex: "10",
        color: "blue",
        whiteSpace: "noWrap",
        display: "flex",
        alignItems: "center"
      }}
      ref={ref}
      className={s.title}
    >
      <h1><strong>Spring Rider</strong> by <strong>Derrick Adams</strong></h1><span className={leftPos > 0 ? s.textShown : s.textHidden}>, brings to life not only the imagery he is
      known for, but also the bodily experiences it is meant to capture. Each
      sculpture in the edition is a real-life manifestation of Adams’ signature
      iconography; a visual vocabulary composed of objects, symbols, colors, and
      shapes, all of which are recontextualized in order to depict leisure in an
      unprecedented way while simultaneously illuminating the inherent role
      consumerism plays in such moments of fun and relief. The edition draws
      from Adams’ Floaters series, which includes vivid portraits of Black
      people in various states of rest and play. Mounted atop colorful unicorns
      or candy shaped plastic floaties popularized in recent years, the figures
      represent an updated version of contemporary American iconography. Now
      extended further into the grasp of individuals, TO BE TITLED (Unicorn
      Spring Rider) provides a new way to experience the emotions evoked by
      Adams’ paintings.</span>
    </article>
  )
}

export default Text
