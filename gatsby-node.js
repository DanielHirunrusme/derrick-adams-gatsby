const path = require("path");

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
    console.log('stage', stage);
  if (stage === "build-html" || stage == "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

// exports.onCreateWebpackConfig = ({
//   stage,
//   rules,
//   loaders,
//   plugins,
//   actions,
// }) => {

// //   actions.setWebpackConfig({
// //     resolve: {
// //       alias: {
// //         "~components": path.resolve(__dirname, "src/components"),
// //         "~images": path.resolve(__dirname, "src/images"),
// //       },
// //     },
// //   })

// //   if (stage === "develop-html") {
// //     actions.setWebpackConfig({
// //       module: {
// //         rules: [
// //           {
// //             test: /canvas/,
// //             use: loaders.null(),
// //           },
// //         ],
// //       },
// //     })
// //   }
// }
