import * as s from "../css/button.module.css";
import cx from "classnames";
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Sparkles from "react-sparkle";
import { TOTAL_COUNT } from "../utils/settings";

const Button = ({
  progress,
  onTouchStart,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
  onClick,
  playing,
  vrEnded,
  mouseCoordinates,
  ended,
}) => {
  const [sparkleCount, setSparkleCount] = useState(6);
  const [sparkleSpeed, setSparkleSpeed] = useState(20);

  const percent =
    Math.floor(progress * TOTAL_COUNT) > 0
      ? Math.floor(progress * TOTAL_COUNT)
      : 0;

  useEffect(() => {
    playing ? setSparkleCount(32) : setSparkleCount(6);
    playing ? setSparkleSpeed(40) : setSparkleSpeed(20);
  }, [playing]);

  if (!ended) {
    return (
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onClick}
        className={s.root}
      >
        <div className={s.buttonHolder}>
          <button className={cx(s.button, { [s.buttonPlaying]: playing })} />
          <CircularProgressbar
            className={s.loader}
            strokeWidth={4}
            value={percent}
            maxValue={TOTAL_COUNT}
          />
          <Sparkles
            color={"#F2F1EF"}
            flicker={false}
            fadeOutSpeed={sparkleSpeed}
            count={sparkleCount}
            minSize={4}
            maxSize={8}
          />
        </div>
        <span className={cx(s.text, { [s.textPlaying]: playing })}>
          {!vrEnded ? "Play" : "Replay?"}
        </span>
      </div>
    );
  } else {
    return (
      <></>
    );
  }
};

export default Button;
