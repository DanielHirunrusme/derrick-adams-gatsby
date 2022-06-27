module.exports = {
  siteMetadata: {
    title: `Derrick Adams Editions`,
    siteUrl: `https://derrickadamsmain.gtsb.io/`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        duration: 2000
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-YXBVEW33ND",
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
