const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[chunkhash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "./imgs/[name].[hash].[ext]",
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[chunkhash].css" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          "css-loader", // 2. Turns css into commonjs
          "sass-loader", // 1. Turns sass into css
        ],
      },
    ],
  },
});
