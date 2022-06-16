import React from "react";
import * as t from "../../css/index.module.css";
import * as s from "./content.module.css";
import { h1 } from "../../css/typography.module.css";
import Title from "../Title";
import cx from "classnames";
import { StickyContainer, Sticky } from "react-sticky";
import Sparkles from "react-sparkle";

const Content = ({ ended, setEnded }) => {
  return (
    <article className={s.root}>
      <div>
        <Title sticky={false} ended={ended} setEnded={setEnded} />
        {/* <div className={cx(t.title, t.titleContent)}>
          <StickyContainer>
            <h1 className={h1}>
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
            </h1>
            <p>by Derrick Adams</p>
            <Sticky topOffset={0}>
              {({ style }) => (
                <nav style={style} className={s.nav}>
                  <a href="#about">About</a>,&nbsp;
                  <a href="#gallery">Gallery</a>,&nbsp;
                  <a href="#purchase">Purchase</a>
                </nav>
              )}
            </Sticky>
          </StickyContainer>
        </div> */}
        <div>
          <section className={s.about} id="About">
            <article>
              Derrick Adams’ new edition, brings to life not only the imagery he
              is known for, but also the bodily experiences it is meant to
              capture. Each sculpture in the edition is a real-life
              manifestation of Adams’ signature iconography; a visual vocabulary
              composed of objects, symbols, colors, and shapes, all of which are
              recontextualized in order to depict leisure in an unprecedented
              way while simultaneously illuminating the inherent role
              consumerism plays in such moments of fun and relief. The edition
              draws from Adams’ Floaters series, which includes vivid portraits
              of Black people in various states of rest and play. Mounted atop
              colorful unicorns or candy shaped plastic floaties popularized in
              recent years, the figures represent an updated version of
              contemporary American iconography. Now extended further into the
              grasp of individuals, FUNTIME UNICORN provides a new way to
              experience the emotions evoked by Adams’ paintings.
            </article>
            <table className={s.table}>
              <tbody>
                <tr>
                  <td>Edition</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>2022</td>
                </tr>
                <tr>
                  <td>Dimensions</td>
                  <td>55 × 62 × 21 in</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>348 lbs</td>
                </tr>
                <tr>
                  <td>Includes</td>
                  <td>Mounting and assembly hardware</td>
                </tr>
                <tr>
                  <td>Materials</td>
                  <td>
                    Cast aluminum, steel, aluminum alloy, alloy steel coil,
                    stainless steel, and hand painted enamel
                  </td>
                </tr>
              </tbody>
            </table>
            <article className={s.gallery} id="Gallery">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </article>
            <article className={s.purchase} id="Purchase">
              <div style={{ position: "relative" }}>
                <a href="">Purchase</a>
                <Sparkles
                  color={"#F2F1EF"}
                  flicker={false}
                  fadeOutSpeed={60}
                  count={8}
                  minSize={4}
                  maxSize={8}
                />
              </div>
              <p className="small">Inquire above for more purchase information.</p>
              {/* <ul>
                <li>
                  <a
                    href="mailto:sales@derrickadamseditions.com"
                    title="Purchase"
                  >
                    Purchase
                  </a>
                </li>
                <li>
                  <a href="mailto:sales@derrickadamseditions.com" title="Press">
                    Press
                  </a>
                </li>
                <li>
                  <a href="mailto:sales@derrickadamseditions.com" title="Press">
                    Contact
                  </a>
                </li>
              </ul> */}

              {/* <p>Inquire to purchase<br /> <a href="mailto:sales@derrickadamseditions.com" title="Inquire">sales@derrickadamseditions.com</a></p> */}
            </article>
          </section>
        </div>
      </div>
    </article>
  );
};

export default Content;
