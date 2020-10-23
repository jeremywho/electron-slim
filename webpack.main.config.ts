import path from "path";

module.exports = (_: any, argv: any) => {
  const mode = argv.mode;
  console.log(`Building main for ${mode}`);
  return {
    context: path.join(__dirname, "src", "main"),
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
  };
};
