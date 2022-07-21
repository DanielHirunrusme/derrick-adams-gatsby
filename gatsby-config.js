require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Derrick Adams Editions`,
    siteUrl: `https://derrickadamseditions.com/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Derrick Adams Editions",
        short_name: "Derrick Adams Editions",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#fff",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.jpg", // This path is relative to the root of the site.
        // crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_APP_PASSWORD,
        storeUrl: process.env.GATSBY_MYSHOPIFY_URL,
        downloadImages: false,
        salesChannel: process.env.SHOPIFY_APP_ID, // Optional but recommended
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        duration: 2000
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GOOGLE_ANALYTICS, // Google Analytics / GA
          process.env.GOOGLE_ADS, // Google Adwords
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          head: true,
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {
          quality: 100,
          formats: [`auto`, `webp`],
          breakpoints: [750, 1080, 1366, 1920],
        },
        // Set to false to allow builds to continue on image errors
        failOnError: true,
        // deprecated options and their defaults:
        base64Width: 20,
        forceBase64Format: 'jpg', // valid formats: png,jpg,webp
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 100,
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
