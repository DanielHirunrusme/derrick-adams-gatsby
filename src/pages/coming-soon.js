import React, { useEffect, useState, useRef } from "react"
import ReactDOM from "react-dom"
import Marquee from "react-fast-marquee"

// ScrollMagic
import { Controller, Scene } from "react-scrollmagic"
import Sequence from "../components/Sequence"
import Text from "../components/Text"
import { graphql } from "gatsby" // to query for image data
import { getImage } from "gatsby-plugin-image"

import "../css/base.css"
import * as s from "../css/index.module.css"
import loadable from "@loadable/component"
const ModelViewer = loadable(() => import("../components/modelViewer"))

export default function ComingSoon({ data }) {
  const [isWindow, setIsWindow] = useState(false)

  const images = data?.allFile?.edges
  const imageData = images?.map(img => getImage(img.node))

  useEffect(() => {
    setIsWindow(true)
  }, [])
  return (
    <main>
      <Marquee gradient={false}>
        <span className={s.marquee}>
          Coming Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;Coming
          Soon&nbsp;&nbsp;&nbsp;Coming Soon&nbsp;&nbsp;&nbsp;
        </span>
      </Marquee>
      <header className={s.header}>
        <h1 className={s.titleComingSoon}>
          <strong>FUNTIME UNICORN</strong> by <strong>DERRICK ADAMS</strong>
        </h1>
      </header>

      {isWindow && <ModelViewer mode="coming soon" />}
    </main>
  )
}
