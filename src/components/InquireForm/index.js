import React, { useState } from "react";
import axios from "axios";
import * as s from "./inquireForm.module.css";
import Sparkles from "react-sparkle";

const ENDPOINT = "https://getform.io/f/d5a5e5cc-1ab0-4319-a0ab-34d87952085b";

const InquireForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formStatus, setFormStatus] = useState(false);
  const [query, setQuery] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .post(ENDPOINT, formData, { headers: { Accept: "application/json" } })
      .then(function (response) {
        setFormStatus(true);
        setQuery({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      })
      .catch(function (error) {
        console.log(error);
        setSubmitted(false);
      });
  };
  return (
    <div className={s.root}>
      {!formStatus ? (
        <form className={s.form} onSubmit={handleSubmit}>
          {/* <span className="small">Fields marked with an *asterisk are required.</span> */}

          <table className={s.table}>
            <tr>
              <td>
                <div className={s.productCell}>
                  <img
                    src="/product-image.jpg"
                    width="100%"
                    alt="Funtime Unicorn"
                    className={s.productImage}
                  />
                  <div className={s.tdPadding}>
                    <p>
                      FUNTIME UNICORN
                      <br />
                      $50,000 USD
                    </p>
                    <br />
                    <p className="small">
                      Shipping is not included.
                      <br />
                      Additional taxes may apply.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
            <tr className={s.fieldWrap}>
              <td colspan="2">
                {/* <label htmlFor="email">Email address</label> */}
                <input
                  required
                  type="email"
                  className={s.input}
                  id="email"
                  placeholder="Email address*"
                  name="email"
                  value={query.email}
                  onChange={handleChange()}
                />
              </td>
            </tr>
            <tr className={s.fieldWrap}>
              <td colspan="2">
                {/* <label htmlFor="name">Name</label> */}
                <input
                  type="text"
                  className={s.input}
                  id="name"
                  placeholder="Your name*"
                  required
                  name="name"
                  value={query.name}
                  onChange={handleChange()}
                />
              </td>
            </tr>
            <tr className={s.fieldWrap}>
              <td colspan="2">
                <input
                  type="text"
                  className={s.input}
                  id="phone"
                  placeholder="Phone number"
                  required
                  name="phone"
                  value={query.phone}
                  onChange={handleChange()}
                />
              </td>
            </tr>
            <tr className={s.fieldWrap}>
              <td colspan="2">
                {/* <label htmlFor="subject">Subject (optional)</label> */}
                <input
                  type="text"
                  className={s.input}
                  id="subject"
                  placeholder="Subject"
                  required
                  name="subject"
                  value={query.subject}
                  onChange={handleChange()}
                />
              </td>
            </tr>
            <tr className={s.fieldWrap}>
              <td colspan="2">
                {/* <label htmlFor="message">Message</label> */}
                <textarea
                  id="message"
                  required
                  className={s.input}
                  name="message"
                  placeholder="Message"
                  value={query.message}
                  rows="5"
                  onChange={handleChange()}
                />
              </td>
            </tr>
          </table>
          {/* <div className="small">
            <label><input type="checkbox" />Sign me up to receive news about Derrick Adams.</label>
          </div> */}
          <div className={s.errorMessage}>
            {formStatus ? (
              <span>Thank you. Your message has been sent.</span>
            ) : (
              ""
            )}
          </div>

          <div style={{ position: "relative" }}>
            <button className={s.submitButton} type="submit" bg="transparent">
              Submit Inquiry
            </button>
            <Sparkles
              color={"#F2F1EF"}
              flicker={false}
              fadeOutSpeed={60}
              count={8}
              minSize={4}
              maxSize={8}
            />
          </div>
          <span className="small">
            By submitting the form you agree to be contacted.
          </span>
        </form>
      ) : (
        <div className={s.successMessage}>Your inquiry has been sent.</div>
      )}
    </div>
  );
};

export default InquireForm;
