import React from "react";
import * as t from "../../css/index.module.css";
import * as s from "./content.module.css";
import { h1 } from "../../css/typography.module.css";
import Title from "../Title";
import cx from "classnames";
import Sparkles from "react-sparkle";
import InquireForm from "../InquireForm";

const Content = ({ ended, setEnded, index }) => {
  return (
    <article className={s.root}>
      <div>
        <div>
          <Title
            sticky={false}
            index={index}
            ended={ended}
            setEnded={setEnded}
          />
          <section className={s.about} id="About">
            <h2>
              <span style={{ letterSpacing: "-.04em" }}>A</span>b
              <span style={{ letterSpacing: "-.0875em" }}>o</span>
              <span style={{ letterSpacing: "-.05em" }}>u</span>t
            </h2>
            <article>
              <p>
                FUNTIME UNICORN builds off Derrick Adams’ signature iconography
                and imagery via a continuation of the artist's acclaimed Floater
                paintings -- a collection of vivid portraits that show Black
                people in various states of rest and play atop the popularized
                plastic pool float. An ode to the Black Unicorn figure first
                appearing in the Floater paintings, then realized as life-size
                inflatable pool floats, Funtime Unicorn in this latest iteration
                is a manifestation of Adams' conviction. The idea that Black
                joy, love, and play should be normalized and celebrated in
                popular visual culture.
              </p>
            </article>
            <table className={s.table}>
              <tbody>
                <tr>
                  <td>
                    <p>Edition</p>
                  </td>
                  <td>
                    <p>30 + 10 APs</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Year</p>
                  </td>
                  <td>
                    <p>2022</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Dimensions</p>
                  </td>
                  <td>
                    <p>
                      37 9/16” tall (seat is 21 1/8”), 43 7/16” long, 8” wide
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Weight</p>
                  </td>
                  <td>
                    <p>94 lbs (without spring)</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Includes</p>
                  </td>
                  <td>
                    <p>Mounting and assembly hardware</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Materials</p>
                  </td>
                  <td>
                    <p>
                      Cast aluminum, steel, aluminum alloy, alloy steel coil,
                      stainless steel, and hand painted enamel
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <article className={s.gallery} id="Gallery">
              <h2>Gallery</h2>
              <div className={s.galleryGrid}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </article>
            <article className={s.purchase} id="Purchase">
              <h2>Purchase</h2>
              <InquireForm />
            </article>
          </section>
        </div>
      </div>
    </article>
  );
};

export default Content;
