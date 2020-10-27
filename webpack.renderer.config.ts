import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { spawn } from "child_process";

module.exports = (_: any, argv: any) => {
  const mode = argv.mode;
  const isDev = mode === "development";
  const port = parseInt(process.env.PORT || "6580") || 6580;

  console.log(`Building main for ${mode}`);

  return {
    mode,
    context: path.join(__dirname, "src", "renderer"),
    target: "electron-renderer",
    devtool: isDev ? "source-map" : undefined,
    entry: {
      "render-process": "./render-process.tsx",
    },
    output: {
      filename: "[name].js", //filename: isDev ? "[name].js" : "[name].[hash].js",
      path: path.join(__dirname, "dist"),
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
        cache: true,
      }),
    ],

    devServer: isDev
      ? {
          contentBase: path.join(__dirname, "dist"),
          compress: true,
          hot: true,
          port,
          before() {
            console.log("Starting main process");
            spawn("npm", ["run", "start-main"], {
              shell: true,
              env: process.env,
              stdio: "inherit",
            })
              .on("close", process.exit)
              .on("error", console.error);
          },
        }
      : undefined,
  };
};
