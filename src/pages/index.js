import React from "react"
import "@google/model-viewer"
import "../css/base.css"
import * as s from "../css/index.module.css"

export default function Home() {
  return (
    <main className={s.container}>
      <header className={s.header}>
      <h1 className={s.title}><strong>Spring Rider</strong> by <strong>Derrick Adams</strong></h1>
      </header>
      <model-viewer
        className={s.modelViewer}
        camera-controls
        auto-rotate
        disable-zoom
        autoplay
        shadow-intensity="1"
        ar
        ar-scale="fixed"
        poster="/poster.webp"
        src="/spring-motion-ar.glb"
        environment-image="neutral"
        alt="A 3D model of Derrick Adams Spring Rider"
        style={{ backgroundColor: "unset", width: "100%", height: "100%" }}
        ar-modes="webxr scene-viewer quick-look"
      >
        <div class="progress-bar hide" slot="progress-bar">
          <div class="update-bar"></div>
        </div>
        <button slot="ar-button" className={s.arButton}>
          View
        </button>
      </model-viewer>
    </main>
  )
}
