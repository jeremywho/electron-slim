import path from "path";
import { DefinePlugin } from "webpack";

module.exports = (env: any) => {
  const mode = env.NODE_ENV;
  console.log(`Building main for ${mode}`);
  return {
    context: path.join(__dirname, "src"),
    target: "electron-main",
    mode,
    entry: {
      "main-process": "./main-process.ts",
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist"),
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript", "@babel/preset-env"],
            },
          },
        },
      ],
    },

    plugins: [
      new DefinePlugin({
        ENVIRONMENT: JSON.stringify(mode), // this variable name must match the one declared in the main process file.
      }),
    ],
  };
};
