// import path from "path";
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import { DefinePlugin } from "webpack";

// type Mode = "development" | "production";

// function createRenderConfig(mode: Mode) {
//   const isDev = mode === "development";
//   return {
//     mode,
//     context: path.join(__dirname, "src"),
//     target: "electron-renderer",
//     devtool: isDev ? "source-map" : "none",
//     entry: {
//       "render-process": "./render-process.tsx",
//     },
//     output: {
//       filename: isDev ? "[name].js" : "[name].[hash].js",
//       path: path.join(__dirname, "dist"),
//     },
//     resolve: {
//       extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
//     },

//     module: {
//       rules: [
//         {
//           test: /\.(js|jsx|ts|tsx)$/,
//           exclude: /node_modules/,
//           use: {
//             loader: "babel-loader",
//             options: {
//               presets: [
//                 "@babel/preset-typescript",
//                 "@babel/preset-react",
//                 "@babel/preset-env",
//               ],
//               plugins: ["@babel/plugin-proposal-class-properties"],
//             },
//           },
//         },
//       ],
//     },

//     plugins: [
//       new HtmlWebpackPlugin({
//         filename: "index.html",
//         template: "index.html",
//         cache: true,
//       }),
//     ],

//     devServer: isDev
//       ? {
//           contentBase: path.join(__dirname, "dist"),
//           compress: true,
//           hot: true,
//           port: 6564,
//         }
//       : undefined,
//   };
// }

// function createMainConfig(mode: Mode) {
//   return {
//     context: path.join(__dirname, "src"),
//     target: "electron-main",
//     mode,
//     entry: {
//       "main-process": "./main-process.ts",
//     },
//     output: {
//       filename: "[name].js",
//       path: path.join(__dirname, "dist"),
//     },

//     module: {
//       rules: [
//         {
//           test: /\.ts$/,
//           exclude: /node_modules/,
//           use: {
//             loader: "babel-loader",
//             options: {
//               presets: ["@babel/preset-typescript", "@babel/preset-env"],
//             },
//           },
//         },
//       ],
//     },

//     plugins: [
//       // inject this becaus the main process uses different logic for prod and dev.
//       new DefinePlugin({
//         ENVIRONMENT: JSON.stringify(mode), // this variable name must match the one declared in the main process file.
//       }),
//     ],
//   };
// }

// module.exports = function (env: any) {
//   const mode: Mode = env.NODE_ENV;
//   const target = env.target;

//   console.log(`Building ${target} for ${mode}`);

//   return target == "main" ? createMainConfig(mode) : createRenderConfig(mode);
// };
