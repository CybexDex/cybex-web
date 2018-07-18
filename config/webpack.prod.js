const {
  loaders,
  resolve,
  plugins,
  BASE_URL,
  outputPath,
  defines
} = require("./webpack.config");
const Clean = require("clean-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const path = require("path");
console.log("Webpack Config for Dev");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssLoaders = [
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader"
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [require("autoprefixer")]
        }
      }
    ]
  },
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader"
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [require("autoprefixer")],
          options: {
            minimize: true,
            debug: false
          }
        }
      },
      {
        loader: "sass-loader",
        options: {
          outputStyle: "expanded",
          minimize: true,
          debug: false
        }
      }
    ]
  }
];

// PROD OUTPUT PATH
let outputDir = "dist";
// outputPath =

// DIRECTORY CLEANER
var cleanDirectories = [outputDir];
const prodPlugins = plugins.concat([
  new Clean(cleanDirectories, {
    root: BASE_URL
  }),
  new PreloadWebpackPlugin({
    rel: "prefetch"
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    },
    __DEV__: false,
    ...defines
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name]-[hash:7].css",
    chunkFilename: "[id]-[hash:7].css"
  })
  // new webpack.LoaderOptionsPlugin({
  //   minimize: true,
  //   debug: false
  // })
  // new webpack.optimize.ModuleConcatenationPlugin(),
]);

const config = {
  entry: {
    // styles: path.resolve(BASE_URL, "app/assets/style-loader.js"),
    // assets: path.resolve(BASE_URL, "app/assets/loader"),
    app: path.resolve(BASE_URL, "app/Main.js")
  },
  context: path.resolve(BASE_URL, "app"),
  output: {
    publicPath: "/",
    path: path.join(BASE_URL, outputDir),
    filename: "[name]-[hash:7].js",
    pathinfo: true,
    sourceMapFilename: "[name].js.map"
  },
  mode: "production",
  devtool: "none",
  module: {
    rules: loaders.concat(cssLoaders)
  },
  resolve,
  plugins: prodPlugins,
  node: {
    fs: "empty"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        },
        commons: {
          test: /node_modules/,
          name: "commons",
          chunks: "initial",
          enforce: true
        }
      }
    }
  }
};

module.exports = config;
