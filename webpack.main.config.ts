import { join } from "path";

module.exports = (_: any, argv: any) => {
  const { mode } = argv;
  console.log(`Building main for ${mode}`);
  return {
    context: join(__dirname, "src", "main"),
    target: "electron-main",
    mode,
    entry: {
      "main-process": "./main-process.ts",
    },
    output: {
      filename: "[name].js",
      path: join(__dirname, "dist"),
    },

    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
        },
      ],
    },
  };
};
