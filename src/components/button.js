import * as s from "../css/button.module.css";
import cx from "classnames";
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Sparkles from "react-sparkle";

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
  const percent =
    Math.floor(progress * totalLength) > 0
      ? Math.floor(progress * totalLength)
      : 0;
  const [rotate, setRotate] = useState(45);
  let gradientTransform = `rotate(${rotate})`;

  useEffect(() => {
    setInterval(() => {
      setRotate(rotate + 1);
    }, 100);
  }, []);
  return (
    <div  onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp} className={s.root}>
      <div className={s.buttonHolder}>
        <button
         
          className={cx(s.button, { [s.buttonPlaying]: playing })}
        />
        <CircularProgressbar
          className={s.loader}
          strokeWidth={playing ? 4 : 4}
          value={percent}
          maxValue={totalLength}
        />
        <Sparkles
          color={"#F2F1EF"}
          flicker={false}
          fadeOutSpeed={40}
          count={16}
          minSize={4}
          maxSize={8}
        />
      </div>
      <span className={cx(s.text, { [s.textPlaying]: playing })}>
        {!vrEnded ? "Play" : "Replay?"}
      </span>
    </div>
  );
};

export default Button;
