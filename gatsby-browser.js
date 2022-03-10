// gatsby-browser.js
import ReactDOM from 'react-dom'
const loadableReady = require('@loadable/component').loadableReady;

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
        ReactDOM.render(element, container, callback);
    });
  };
};