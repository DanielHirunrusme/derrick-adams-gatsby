import React, { forwardRef, useState, useEffect } from "react";
import { useStaticQuery, graphql, StaticQuery } from "gatsby"; // to query for image data
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { src } from "prettier";
import * as s from "../../css/index.module.css";

const CanvasImage = ({ image, opacity }) => {
  const [img, status] = useImage(image);
  console.log("canvas image:", image);
  if (status === "loaded")
    return (
      <KonvaImage
        image={img}
        opacity={opacity}
        // x={image.x}
        // y={image.y}
        // I will use offset to set origin to the center of the image
        // offsetX={img ? img.width / 2 : 0}
        // offsetY={img ? img.height / 2 : 0}
      />
    );
};

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
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    // if (oldProps.src !== this.props.src) {
    //   this.loadImage();
    // }
    this.loadImage();
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    console.log("load image");
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });

    console.log(this.image);
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <KonvaImage
        opacity={this.props.opacity}
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        width={1368}
        height={774}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}

const ImageSequence = ({ progress, images, vr_1, rawImages }) => {
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = React.useState([]);
  const coreLength = 784;
  const vrLength = 444;
  const totalLength = coreLength + vrLength;
  let index = Math.round(progress * 1 * totalLength);
  const [scroll, setScroll] = useState(Math.floor(progress * totalLength));

  // console.log("progress calc:", Math.floor(progress * totalLength));

  // get promises for all images
  // once returned halfway then show canvas

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = src;
        // img.src = src?.images?.fallback?.src;
        img.onload = resolve(img);
        img.onerror = reject();
      });
    });

    await Promise.all(promises);
  };

  // useEffect(() => {
  //   cacheImages(images) && setLoaded(true);
  //   setLoaded(true);
  // }, []);

  // useEffect(() => {
  //   console.log("loaded", loaded);
  // }, [loaded]);

  console.log("index", index);

  let num = Math.floor(progress * totalLength);

  // return (
  //   <Layer>
  //     {/* <URLImage
  //       // opacity={i !== num ? 0 : 1}
  //       src={images[num].images?.fallback?.src}
  //     /> */}
  //     <CanvasImage image={image} />
  //     <LionImage x={num} y={num} />
  //   </Layer>
  // );

  if (rawImages) {
    return (
      <>
        {/* {images?.map((image, i) => (
        <div
          key={`core-${i}`}
          style={{
            
            height: "100%",
            width: "100%",
            position: "absolute",
            pointerEvents: "none",
          }}
        >
          <img className={s.image} src={image} alt="Spring Rider" />
        </div>
      ))} */}
        {rawImages?.map((image, i) => {
          let img = getImage(image.node.childImageSharp.gatsbyImageData);
          return (
            <div
              style={{
                height: "100%",
                width: "100%",
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
                loading="eager"
                alt="Funtime Unicorn"
                style={{
                  height: "100%",
                  width: "100%"
                }}
              />
            </div>
          );
        })}
        {/* {vr_1?.map((image, i) => (
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
            <img className={s.image} src={image} alt="Spring Rider" />
          </div>
        ))} */}
      </>
    );
  } else {
    return <>Loading</>;
  }
};

export default ImageSequence;
