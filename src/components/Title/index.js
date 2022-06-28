import React from "react";
import cx from "classnames";
import * as s from "../../css/index.module.css";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { TOTAL_COUNT } from "../../utils/settings";

const Title = ({
  playing,
  progress,
  index,
  sticky = true,
  setEnded,
  ended,
}) => {
  const anchorLinkClicked = (str) => {
    setEnded(true);
  };
  return (
    <>
      {sticky && (
        <header
          className={cx(
            s.header,
            { [s.headerSticky]: index >= TOTAL_COUNT }
          )}
        >
          <nav className={s.headerInner}>
            <AnchorLink
              to="/#About"
              title="About"
              className="stripped"
              stripHash
              onAnchorLinkClick={anchorLinkClicked}
            />
            ,&nbsp;
            <AnchorLink
              to="/#Gallery"
              title="Gallery"
              className="stripped"
              stripHash
              onAnchorLinkClick={anchorLinkClicked}
            />
            ,&nbsp;
            <AnchorLink
              to="/#Purchase"
              title="Purchase"
              className="stripped"
              stripHash
              onAnchorLinkClick={anchorLinkClicked}
            />
            <div className={s.external}>
              <a title="Derrick Adams Website" href="http://www.derrickadams.com/" target="blank">
                <svg
                  width="1em"
                  viewBox="0 0 467 474"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    d="M459.83 237.8L250.48 6.66014C246.769 2.66794 241.574 0.402344 236.128 0.402344C230.687 0.402344 225.483 2.66405 221.776 6.65625L5.66629 239.056C0.357688 244.767 -1.06422 253.079 2.04909 260.236C5.16628 267.381 12.2211 272.006 20.0181 272.006H75.6041V440.006C75.6041 458.561 90.1201 473.608 108.678 473.608H148.401C160.772 473.608 170.799 463.577 170.799 451.21L170.803 367.206C170.803 354.835 180.834 344.808 193.201 344.808H271.599C283.97 344.808 293.997 354.839 293.997 367.206V451.206C293.997 463.577 304.028 473.604 316.395 473.604H355.063C373.625 473.608 389.2 458.561 389.2 440.006V272.006H446.649C446.692 272.01 446.735 272.006 446.762 272.006C457.594 272.006 466.364 263.237 466.364 252.404C466.356 246.603 463.837 241.392 459.833 237.802L459.83 237.8Z"
                  />
                </svg>
              </a>

              <a title="Derrick Adams Instagram" href="https://www.instagram.com/derrickadamsny" target="blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
              {/* <i class="fa-regular fa-envelope"></i> */}
            </div>
          </nav>
        </header>
      )}
      <section>
        <div
          className={cx(
            s.title,
            { [s.titleContent]: !sticky }
            // { [s.titleHidden]: ended }
          )}
        >
          <div>
            <AnchorLink
              to="/#About"
              title="About"
              className="stripped"
              stripHash
              onAnchorLinkClick={anchorLinkClicked}
            >
              <h1
                className={cx(s.h1, {
                  [s.h1Hidden]: (playing && !ended) || (sticky && ended),
                })}
              >
                <span
                  className="pink"
                  style={{ color: "#F395C7", letterSpacing: "-.055em" }}
                >
                  F
                </span>
                <span
                  className="purple"
                  style={{ color: "#6A03A7", letterSpacing: "-.1em" }}
                >
                  U
                </span>
                <span
                  className="blue"
                  style={{ color: "#016EB3", letterSpacing: "-.05em" }}
                >
                  N
                </span>
                <span
                  className="green"
                  style={{ color: "#00B242", letterSpacing: "-.05em" }}
                >
                  T
                </span>
                <span
                  className="yellow"
                  style={{ color: "#FFD600", letterSpacing: "-.1em" }}
                >
                  I
                </span>
                <span
                  className="orange"
                  style={{ color: "#FF6B15", letterSpacing: "-.1em" }}
                >
                  M
                </span>
                <span className="red" style={{ color: "#E13E53" }}>
                  E
                </span>
                <span>&nbsp;</span>
                <span
                  className="pink"
                  style={{ color: "#F395C7", letterSpacing: "-.1em" }}
                >
                  U
                </span>
                <span
                  className="purple"
                  style={{ color: "#6A03A7", letterSpacing: "-.1em" }}
                >
                  N
                </span>
                <span className="blue" style={{ color: "#016EB3" }}>
                  I
                </span>
                <span
                  className="green"
                  style={{ color: "#00B242", letterSpacing: "-.0675em" }}
                >
                  C
                </span>
                <span
                  className="yellow"
                  style={{ color: "#FFD600", letterSpacing: "-.08em" }}
                >
                  O
                </span>
                <span
                  className="orange"
                  style={{ color: "#FF6B15", letterSpacing: "-.095em" }}
                >
                  R
                </span>
                <span className="red" style={{ color: "#E13E53" }}>
                  N
                </span>
              </h1>
            </AnchorLink>
            <p
              className={cx(s.authorText, {
                [s.authorTextHidden]: (sticky && playing) || (ended && sticky),
              })}
            >
              by Derrick Adams
            </p>
            {/* {!sticky && <div className={s.bgImage}><img src="/on-white.jpg" alt="Funtime Unicorn" /></div>} */}

          </div>
        </div>
      </section>
    </>
  );
};

export default Title;
