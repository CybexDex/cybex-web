const path = require("path");
const LOADERS = {
  cssLoaders: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
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
  }),
  scssLoaders: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader"
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [require("autoprefixer")]
        }
      },
      {
        loader: "sass-loader",
        options: {
          outputStyle: "expanded"
        }
      }
    ]
  })
};
const extractCSS = new ExtractTextPlugin("[name].[hash:7].css");


// PROD OUTPUT PATH
let outputDir = "dist";
outputPath = path.join(root_dir, outputDir);

// DIRECTORY CLEANER
var cleanDirectories = [outputDir];
const PLUGINS = [
  new Clean(cleanDirectories, {
    root: root_dir
  }),
  new PreloadWebpackPlugin({
    rel: "prefetch"
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    },
    __DEV__: false
  }),
  extractCSS,
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new UglifyWebpackPlugin()
]

const config = var config = {
  entry: {
    vendor: ["react", "react-dom", "highcharts/highstock", "lodash"],
    styles: path.resolve(root_dir, "app/assets/style-loader.js"),
    assets: env.prod
      ? path.resolve(root_dir, "app/assets/loader")
      : path.resolve(root_dir, "app/assets/loader-dev"),
    app: env.prod
      ? path.resolve(root_dir, "app/Main.js")
      : [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client",
        path.resolve(root_dir, "app/Main-dev.js")
      ]
  },
  output: {
    publicPath: env.prod ? "" : "/",
    path: outputPath,
    filename: "[name]-[hash:7].js",
    pathinfo: !env.prod,
    sourceMapFilename: "[name].js.map"
  },
  devtool: env.prod ? false : "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx|\.ts$/,
        include: [path.join(root_dir, "app")],
        use: [
          {
            loader: "babel-loader",
            options: {
              compact: false,
              cacheDirectory: true,
              plugins: ["react-hot-loader/babel"]
            }
          },
          {
            loader: "awesome-typescript-loader",
            options: {
              useCache: true,
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.js$|\.jsx$/,
        include: [path.join(root_dir, "app")],
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: {
          compact: false,
          cacheDirectory: true,
          plugins: ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.json/,
        loader: "json-loader",
        exclude: [
          path.resolve(root_dir, "app/lib/common"),
          path.resolve(root_dir, "app/assets/locales")
        ]
      },
      {
        test: /\.coffee$/,
        loader: "coffee-loader"
      },
      {
        test: /\.(coffee\.md|litcoffee)$/,
        loader: "coffee-loader?literate"
      },
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.scss$/,
        use: scssLoaders
      },
      {
        test: /\.(gif|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        include: [path.resolve(root_dir, "app/assets/")],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(gif|jpg|woff|woff2|eot|ttf|svg)$/,
        include: [path.resolve(root_dir, "app/components/Common")],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.png$/,
        exclude: [
          path.resolve(root_dir, "app/assets/asset-symbols"),
          path.resolve(root_dir, "app/assets/images"),
          path.resolve(root_dir, "app/assets/language-dropdown/img")
        ],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },

      {
        test: /\.woff$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000,
              mimetype: "application/font-woff"
            }
          }
        ]
      },
      {
        test: /.*\.svg$/,
        exclude: [path.resolve(root_dir, "app/components/Common")],
        loaders: ["svg-inline-loader", "svgo-loader"]
      },
      {
        test: /\.md/,
        use: [
          {
            loader: "html-loader",
            options: {
              removeAttributeQuotes: false
            }
          },
          {
            loader: "remarkable-loader",
            options: {
              preset: "full",
              typographer: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      iconfont: path.resolve(root_dir, "app/assets/stylesheets/iconfont"),
      assets: path.resolve(root_dir, "app/assets"),
      counterpart: path.resolve(root_dir, "app/lib/counterpart"),
      "alt-react": path.resolve(root_dir, "app/lib/alt-react"),
      "react-foundation-apps": path.resolve(
        root_dir,
        "app/lib/react-foundation-apps"
      ),
      app: path.resolve(root_dir, "app")
    },
    modules: [
      "node_modules",
      path.resolve(root_dir, "app"),
      path.resolve(root_dir, "app/lib"),
      path.resolve(root_dir, "app/cybex")
    ],
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".coffee",
      ".json",
      ".scss",
      ".ttf",
      ".eot",
      ".woff",
      ".woff2"
    ]
  },
  plugins: plugins,
  node: {
    fs: "empty"
  },
  optimization: {}
};
