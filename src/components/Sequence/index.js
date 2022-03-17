import React, { forwardRef, useState, useEffect } from "react"
import { Skeleton } from "../Skeleton"
import { useStaticQuery, graphql, StaticQuery } from "gatsby" // to query for image data
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

import { Stage, Layer, Image as KonvaImage } from "react-konva"
import useImage from "use-image"
import { src } from "prettier"
import * as s from "../../css/index.module.css"

const TOTAL_IMAGES = 1565

// the first very simple and recommended way:
const LionImage = () => {
  const [image] = useImage("https://konvajs.org/assets/lion.png")
  return <KonvaImage image={image} />
}

// const loadImage = (url) => {
//   // set crossOrigin of image as second argument
//   const [image, status] = useImage(url, 'anonymous');

//   // status can be "loading", "loaded" or "failed"

//   return (
//     <Image image={image} />
//   );
// }

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
class URLImage extends React.Component {
  state = {
    image: null,
  }
  componentDidMount() {
    this.loadImage()
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage()
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad)
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image()
    this.image.src = this.props.src
    this.image.addEventListener("load", this.handleLoad)
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    })
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  }
  render() {
    return (
      <KonvaImage
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        width={1368}
        height={774}
        ref={node => {
          this.imageNode = node
        }}
      />
    )
  }
}



const ImageSequence = ({ progress, images }) => {
  let index = Math.round(progress * 1 * images.length)
  const [loaded, setLoaded] = useState(false);

  // get promises for all images
  // once returned halfway then show canvas

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src)=>{
      return new Promise(function  (resolve, reject) {
  
        const img = new Image();
        img.src = src?.images?.fallback?.src;
        img.onload = resolve(img);
        img.onerror = reject();
      })
    })
  
    await Promise.all(promises);
  }

  useEffect(()=>{
    cacheImages(images) && setLoaded(true);
    setLoaded(true);
  }, []);

  useEffect(()=>{
    console.log('loaded', loaded)
  }, [loaded]);

  // return (
  //   <Stage width={1368} height={774}>
  //     <Layer>
  //         {loaded && images[index] && <URLImage src={images[index].images?.fallback?.src} x={0} />}
  //       <LionImage />
  //     </Layer>
  //   </Stage>
  // )

  if(loaded){
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
        <img src={image.images?.fallback?.src} alt="Spring Rider" className={s.mainImage} />
      </div>
    )
  })

    // return <img src={images[index].images?.fallback?.src} alt="Spring Rider" />
  // return <GatsbyImage image={images[index]} alt="Spring Rider" width="100%" height="100%" placeholder="blurred" layout="constrained" objectFit="cover" loading="eager" objectPosition="center" />
  } else {
    return <></>
  }
  // return images?.map((image, i) => {
  //   return (
  //     <div
  //       key={i}
  //       style={{
  //         display: i !== index ? "none" : "block",
  //         height: "100%",
  //         width: "100%",
  //         position: "relative"
  //       }}
  //     >
  //       {/* <span style={{position: "absolute", display: "block", color: "red"}}>{i}</span> */}
  //       <GatsbyImage image={image} alt="Spring Rider" width="100%" height="100%" placeholder="blurred" objectFit="cover" loading="lazy" objectPosition="center" />
  //     </div>
  //   )
  // })
}

export default ImageSequence
