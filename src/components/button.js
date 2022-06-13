import * as s from "../css/index.module.css";
import cx from "classnames"
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Button = ({
  progress,
  onTouchStart,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
  playing,
  vrEnded,
  mouseCoordinates,
}) => {
  const coreLength = 784;
  const vrLength = 444;
  const totalLength = coreLength + vrLength;
  const percent = Math.floor(progress * totalLength) > 0 ? Math.floor(progress * totalLength) : 0;
  const [rotate, setRotate] = useState(45);
  let gradientTransform = `rotate(${rotate})`;

  useEffect(() => {
    setInterval(() => {
      setRotate(rotate + 1);
    }, 100);
  }, []);
  return (
      <div className={s.buttonHolder}  
      >
    <button
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={cx(s.button, {[s.buttonPlaying]: playing})}
    >
      {!vrEnded ? "Play" : "Replay?"}
    </button>
    <CircularProgressbar
        className={s.loader}
        strokeWidth={playing ? 6 : 6}
        value={percent}
        maxValue={totalLength}
      />
      <svg
        className={s.svgGradient}
        style={{ height: "100px", width: "100px" }}
      >
        <defs>
          <linearGradient
            id="gradientStroke"
            gradientTransform={`rotate(${rotate})`}
          >
            <stop offset="0%" stopColor={"#EAA3F8"} />
            <stop offset="19.9%" stopColor={"#EAA3F8"} />
            <stop offset="20%" stopColor={"#CD1318"} />
            <stop offset="39.9%" stopColor={"#CD1318"} />
            <stop offset="40%" stopColor={"#20A12E"} />
            <stop offset="59.9%" stopColor={"#20A12E"} />
            <stop offset="60%" stopColor={"#1536AB"} />
            <stop offset="79.9%" stopColor={"#1536AB"} />
            <stop offset="80%" stopColor={"#1536AB"} />
            <stop offset="99.9%" stopColor={"#1536AB"} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Button;
