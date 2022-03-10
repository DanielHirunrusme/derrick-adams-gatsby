import React, {useEffect, useState} from "react"
import "../css/base.css"
import * as s from "../css/index.module.css"
import loadable from '@loadable/component'
const ModelViewer = loadable(() => import('../components/modelViewer'))
export default function Home() {
  const [isWindow, setIsWindow] = useState(false);
  useEffect(()=>{
    setIsWindow(true)
  }, [])
  return (
    <main className={s.container}>
      <header className={s.header}>
      <h1 className={s.title}><strong>Spring Rider</strong> by <strong>Derrick Adams</strong></h1>
      </header>
      {isWindow && <ModelViewer />}
    </main>
  )
}
