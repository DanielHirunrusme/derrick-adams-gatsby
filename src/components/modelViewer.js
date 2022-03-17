import React from "react"
import "@google/model-viewer"
import * as s from "../css/index.module.css"

const ModelViewer = () => {
  return (
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
      style={{ backgroundColor: "unset", width: "100px", height: "100px", position: "fixed", left: "0px", bottom: "0", zIndex:"30" }}
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
  )
}

export default ModelViewer
