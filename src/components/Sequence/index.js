import React, { forwardRef, useState } from "react"
import { Skeleton } from "../Skeleton"
import { useStaticQuery, graphql, StaticQuery } from "gatsby" // to query for image data
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

const TOTAL_IMAGES = 1565

const ImageSequence = ({ progress, images }) => {
  let index = Math.round(progress * 1 * (images.length));

  // return <GatsbyImage image={images[index]} alt="Spring Rider" width="100%" height="100%" placeholder="blurred" layout="constrained" objectFit="cover" loading="eager" objectPosition="center" />

  return images?.map((image, i) => {
    return (
      <div
        key={i}
        style={{
          display: i !== index ? "none" : "block",
          height: "100%",
          width: "100%",
          position: "relative"
        }}
      >
        {/* <span style={{position: "absolute", display: "block", color: "red"}}>{i}</span> */}
        <GatsbyImage image={image} alt="Spring Rider" width="100%" height="100%" placeholder="blurred" objectFit="cover" loading="lazy" objectPosition="center" />
      </div>
    )
  })
}

export default ImageSequence
