import React from "react"
import "@google/model-viewer"
import * as s from "../css/index.module.css"

const ModelViewer = ({mode = "production"}) => {
  if(mode === "coming soon") {
    return (
      <div className={s.viewerLarge}>
      <model-viewer
        className={s.modelViewer}
        camera-controls
        bounds="tight" 
        auto-rotate
        disable-zoom
        autoplay
        shadow-intensity="1"
        poster="/poster.webp"
        src="/spring-rider.glb"
        max-camera-orbit="0 100deg auto"
        environment-image="neutral"
        alt="A 3D model of Derrick Adams Spring Rider"
        style={{ backgroundColor: "unset", width: "100%", height: "100%", position: "fixed", top: 0, left: 0 }}
        ar 
        ar-modes="webxr scene-viewer quick-look"
      >
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar"></div>
        </div>
        <button slot="ar-button" className={s.arButton}>
          View
        </button>
      </model-viewer>
      </div>
    )
  } else {
    return (
      <div className={s.viewer}>
      <model-viewer
        className={s.modelViewer}
        camera-controls
        bounds="tight" 
        auto-rotate
        disable-zoom
        autoplay
        shadow-intensity="1"
        poster="/poster.webp"
        src="/spring-rider.glb"
        max-camera-orbit="0 100deg auto"
        environment-image="neutral"
        alt="A 3D model of Derrick Adams Spring Rider"
        style={{ backgroundColor: "unset", width: "100px", height: "100px", position: "relative" }}
        ar 
        ar-modes="webxr scene-viewer quick-look"
      >
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar"></div>
        </div>
        <button slot="ar-button" className={s.arButtonFull}>
          View
        </button>
      </model-viewer>
      </div>
    )
  }
  
}

export default ModelViewer
