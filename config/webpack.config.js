const path = require("path");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const git = require("git-rev-sync");
const CopyWebpackPlugin = require("copy-webpack-plugin");
require("es6-promise").polyfill();
// BASE APP DIR
let gitRevisionPlugin = new GitRevisionPlugin({
  branch: true
});

const isTest =
  JSON.stringify(gitRevisionPlugin.branch()).indexOf("test") !== -1 ||
  (process.env.NODE_ENV_TEST &&
    process.env.NODE_ENV_TEST.toLowerCase() === "test");

const isTestStaging =
  process.env.NODE_ENV_TEST &&
  process.env.NODE_ENV_TEST.toLowerCase() === "staging";
const isForSecruity =
  process.env.NODE_ENV_TEST &&
  process.env.NODE_ENV_TEST.toLowerCase() === "security";

const BASE_URL = path.resolve(__dirname, "./..");
let root_dir = BASE_URL;
console.log("ROOT: ", root_dir);
const defines = {
  APP_VERSION: JSON.stringify(git.tag()),
  __TEST__: isTest,
  __FOR_SECURITY__: isForSecruity,
  __STAGING__: isTestStaging,
  __ICOAPE__: isTestStaging
    ? JSON.stringify("https://www.icoape.com/")
    : isTest
      ? JSON.stringify("http://47.91.242.71:8083/")
      : JSON.stringify("https://www.icoape.com/"),
  __BASE_URL__: JSON.stringify("/")
};

var outputPath = path.join(BASE_URL, "assets");

var plugins = [
  // new webpack.optimize.OccurrenceOrderPlugin(),
  new CopyWebpackPlugin([
    {
      from: path.join(root_dir, "charting_library"),
      to: "charting_library"
    }
  ])
];

const loaders = [
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
    type: "javascript/auto"
  },
  {
    test: /\.png/,
    include: [path.resolve(root_dir, "app/assets/asset-symbols")],
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
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
    use: [
      {
        loader: "svg-inline-loader"
      },
      {
        loader: "svgo-loader",
        options: {
          plugins: [
            { cleanupAttrs: true },
            { removeMetadata: true },
            { removeXMLNS: true },
            { removeViewBox: false }
          ]
        }
      }
    ]
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
        loader: "markdown-loader",
        options: {
          // preset: "full",
          // typographer: true
        }
      }
    ]
  }
];

const resolve = {
  alias: {
    iconfont: path.resolve(root_dir, "app/assets/stylesheets/iconfont"),
    assets: path.resolve(root_dir, "app/assets"),
    counterpart: path.resolve(root_dir, "app/lib/counterpart"),
    "react-stockcharts": path.resolve(root_dir, "app/lib/react-stockcharts"),
    "alt-react": path.resolve(root_dir, "app/lib/alt-react"),
    "react-foundation-apps": path.resolve(
      root_dir,
      "app/lib/react-foundation-apps"
    ),
    app: path.resolve(root_dir, "app")
  },
  modules: [
    path.resolve(root_dir, "app"),
    path.resolve(root_dir, "app/lib"),
    path.resolve(root_dir, "app/cybex"),
    "node_modules"
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
    ".json",
    ".woff2"
  ]
};

module.exports = {
  BASE_URL,
  outputPath,
  defines,
  loaders,
  resolve,
  plugins,
  externals: {}
};
