const path = require('path')

// exports.onCreateWebpackConfig = ({
//     stage,
//     rules,
//     loaders,
//     plugins,
//     actions,
//   }) => {
//     if (stage === "build-html") {
//       actions.setWebpackConfig({
//         module: {
//           rules: [
//             {
//               test: /canvas/,
//               use: loaders.null(),
//             },
//           ],
//         },
//       })
//     }
    
//   };

exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions
  }) => {
  
    actions.setWebpackConfig({
      resolve: {
        alias: {
          '~components': path.resolve(__dirname, 'src/components'),
          '~images': path.resolve(__dirname, 'src/images'),
          '~hooks': path.resolve(__dirname, 'src/utils/hooks')
        },
      }
    });
  
    if (stage === "develop-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /canvas/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  };