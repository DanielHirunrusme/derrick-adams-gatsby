import React from "react";
import cx from "classnames";
import * as s from "../../css/index.module.css";
import { AnchorLink } from "gatsby-plugin-anchor-links";

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
      {sticky && <header
        className={cx(
          s.header,
          { [s.headerSticky]: ended },
          // { [s.headerHidden]: ended && sticky }
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
          <a href="https://www.instagram.com/derrickadamsny" target="blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
          {/* <i class="fa-regular fa-envelope"></i> */}
        </div>
        </nav>
        
      </header>}
      <section>
        <div
          className={cx(
            s.title,
            { [s.titleContent]: !sticky }
            // { [s.titleHidden]: ended }
          )}
        >
          <div>
            {sticky && <h1
              className={cx(s.h1, {
                [s.h1Hidden]: playing && !ended,
              })}
            >
              <span style={{ color: "#F395C7" }}>F</span>
              <span style={{ color: "#6A03A7" }}>U</span>
              <span style={{ color: "#016EB3" }}>N</span>
              <span style={{ color: "#00B242" }}>T</span>
              <span style={{ color: "#FFD600" }}>I</span>
              <span style={{ color: "#FF6B15" }}>M</span>
              <span style={{ color: "#E13E53" }}>E</span>
              <span>&nbsp;</span>
              <span style={{ color: "#F395C7" }}>U</span>
              <span style={{ color: "#6A03A7" }}>N</span>
              <span style={{ color: "#016EB3" }}>I</span>
              <span style={{ color: "#00B242" }}>C</span>
              <span style={{ color: "#FFD600" }}>O</span>
              <span style={{ color: "#FF6B15" }}>R</span>
              <span style={{ color: "#E13E53" }}>N</span>
            </h1>}
            {sticky && <p
              className={cx(s.authorText, {
                [s.authorTextHidden]: playing,
              })}
            >
              by Derrick Adams
            </p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Title;
