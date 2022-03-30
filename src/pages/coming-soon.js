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

const getRandDelay = () => {
  return `${Math.random() * (2 - 1) + 0.15}s`
}

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
          Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming
          Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming
          Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming
          Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming
          Soon♞♞
        </span>
      </Marquee>
      {/* <h1 className={s.titleComingSoonTop}>
        <strong>DERRICK ADAMS</strong></h1> */}
      <header className={s.header}>
        <h1 className={s.titleComingSoon}>
          <strong>
            <span style={{ animationDelay: getRandDelay() }} className={s.blue}>
              F
            </span>
            <span
              style={{ animationDelay: getRandDelay() }}
              className={s.green}
            >
              U
            </span>
            <span
              style={{ animationDelay: getRandDelay() }}
              className={s.yellow}
            >
              N
            </span>
            <span style={{ animationDelay: getRandDelay() }} className={s.red}>
              T
            </span>
            <span
              style={{ animationDelay: getRandDelay() }}
              className={s.black}
            >
              I
            </span>
            <span style={{ animationDelay: getRandDelay() }} className={s.pink}>
              M
            </span>
            <span
              style={{ animationDelay: getRandDelay() }}
              className={s.purple}
            >
              E
            </span>
            <span>&nbsp;</span>
            <span style={{ animationDelay: getRandDelay() }} className={s.blue}>
              U
            </span>
            <span
              style={{ animationDelay: getRandDelay() }}
              className={s.green}
            >
              N
            </span>
            <span
              style={{ animationDelay: getRandDelay() }}
              className={s.yellow}
            >
              I
            </span>
            <span style={{ animationDelay: getRandDelay() }} className={s.red}>
              C
            </span>
            <span
              style={{ animationDelay: getRandDelay() }}
              className={s.black}
            >
              O
            </span>
            <span style={{ animationDelay: getRandDelay() }} className={s.pink}>
              R
            </span>
            <span
              style={{ animationDelay: getRandDelay() }}
              className={s.purple}
            >
              N
            </span>
          </strong>
          <strong>
            &nbsp;
            <span
              className={s.black}
              style={{ animationDelay: getRandDelay() }}
            >
              by
            </span>
            &nbsp;
            <span
              className={s.black}
              style={{ animationDelay: getRandDelay() }}
            >
              DERRICK
            </span>{" "}
            <span
              className={s.black}
              style={{ animationDelay: getRandDelay() }}
            >
              ADAMS
            </span>
          </strong>
        </h1>
      </header>

      {isWindow && (
        <div className="relative z-10">
          <ModelViewer mode="coming soon" />
        </div>
      )}
      <footer className={s.comingSoonMarqueFooter}>
        <Marquee gradient={false}>
          <span className={s.marquee}>
          Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming
          Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming
          Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming
          Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming Soon♞♞Coming
          Soon♞♞
          </span>
        </Marquee>
      </footer>
    </main>
  )
}
