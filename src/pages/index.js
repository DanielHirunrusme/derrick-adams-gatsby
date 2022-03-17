import React, {useEffect, useState, useRef} from "react"
import ReactDOM from "react-dom";

// ScrollMagic
import { Controller, Scene } from "react-scrollmagic";
import Sequence from "../components/Sequence";
import Text from "../components/Text";
import { graphql } from "gatsby" // to query for image data
import {  getImage } from "gatsby-plugin-image"

import "../css/base.css"
import * as s from "../css/index.module.css"
import loadable from '@loadable/component'
const ModelViewer = loadable(() => import('../components/modelViewer'))


export default function Home({data}) {
  const [isWindow, setIsWindow] = useState(false);


const images = data?.allFile?.edges
const imageData = images?.map((img)=> getImage(img.node))

  useEffect(()=>{
    setIsWindow(true)
  }, [])
  return (
    <main className={s.container}>
      {/* <header className={s.header}>
      <h1 className={s.title}><strong>Spring Rider</strong> by <strong>Derrick Adams</strong></h1>
      </header> */}
      <Controller>
        <Scene duration="4000%" triggerHook="onLeave" pin>
          {progress => (
            <div style={{ height: "100vh", position: "relative" }}>
              <Text progress={progress} />
              <Sequence images={imageData}  progress={progress} />
            </div>
          )}
        </Scene>
      </Controller>

      {isWindow && <ModelViewer />}
    </main>
  )
}

export const query = graphql`
query {
  allFile {
    edges {
      node {
        id
        base
        publicURL
        childImageSharp {
          gatsbyImageData(width: 1000, blurredOptions: {width: 100, toFormat: JPG}, placeholder: BLURRED)
        }
      }
    }
  }
}
`
