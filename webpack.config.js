const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const Clean = require("clean-webpack-plugin");
const git = require("git-rev-sync");
require("es6-promise").polyfill();

// BASE APP DIR
let root_dir = path.resolve(__dirname);
let gitRevisionPlugin = new GitRevisionPlugin({
    branch: true
});

module.exports = function (env) {
    if (!env) {
        env = {
            prod: false
        };
    };
    if (!env.profile) {
        console.log("env:", env);
    }
    // console.log(env.prod ? "Using PRODUCTION options\n" : "Using DEV options\n");
    // STYLE LOADERS
    var cssLoaders = [
        {
            loader: "style-loader"
        },
        {
            loader: "css-loader",
        },
        {
            loader: "postcss-loader"
        }
    ];

    var scssLoaders = [
        {
            loader: "style-loader"
        },
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
    ];

    // OUTPUT PATH
    var outputPath = path.join(root_dir, "assets");

    // COMMON PLUGINS
    const baseUrl = env.electron ? "" : "baseUrl" in env ? env.baseUrl : "/";
    var plugins = [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            // APP_VERSION: JSON.stringify("beta"),
            APP_VERSION: JSON.stringify(git.tag()),
            __TEST__: JSON.stringify(gitRevisionPlugin.branch()).indexOf("test") !== -1,
            __ELECTRON__: !!env.electron,
            __HASH_HISTORY__: !!env.hash,
            __BASE_URL__: JSON.stringify(baseUrl),
            __UI_API__: JSON.stringify(env.apiUrl || ""),
            __TESTNET__: !env.prod,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: env.prod ?
                path.resolve(root_dir, "app/assets/index.html") : path.resolve(root_dir, "app/assets/index-dev.html")
        })
    ];

    if (env.prod) {
        // PROD OUTPUT PATH
        let outputDir = env.electron ? "electron" : env.hash ? "hash-history" : "dist";
        outputPath = path.join(root_dir, outputDir);

        // DIRECTORY CLEANER
        var cleanDirectories = [outputDir];

        // WRAP INTO CSS FILE
        const extractCSS = new ExtractTextPlugin("[name].[hash:7].css");
        cssLoaders = ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader"
            }, {
                loader: "postcss-loader",
                options: {
                    plugins: [require("autoprefixer")]
                }
            }]
        });
        scssLoaders = ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader"
            }, {
                loader: "postcss-loader",
                options: {
                    plugins: [require("autoprefixer")]
                }
            }, {
                loader: "sass-loader",
                options: {
                    outputStyle: "expanded"
                }
            }]
        });

        // PROD PLUGINS
        plugins.push(new Clean(cleanDirectories, {
            root: root_dir
        }));
        plugins.push(new PreloadWebpackPlugin({
            rel: "prefetch"
        }));
        plugins.push(new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            __DEV__: false
        }));
        plugins.push(extractCSS);
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }));
        plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
        if (!env.noUgly) {
            plugins.push(new UglifyWebpackPlugin());
        }
    } else {
        // plugins.push(new webpack.optimize.OccurenceOrderPlugin());
        plugins.push(new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
            },         
            __DEV__: true
        }));
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new webpack.NoEmitOnErrorsPlugin());
    }

    var config = {
        entry: {
            vendor: ["react", "react-dom", "highcharts/highstock", "lodash"],
            styles: path.resolve(root_dir, "app/assets/style-loader.js"),
            assets: env.prod ?
                path.resolve(root_dir, "app/assets/loader") : path.resolve(root_dir, "app/assets/loader-dev"),
            app: env.prod ?
                path.resolve(root_dir, "app/Main.js") : [
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
                    include: [
                        path.join(root_dir, "app")
                    ],
                    use: [{
                        loader: "awesome-typescript-loader",
                        options: {
                            useCache: true,
                            transpileOnly: true
                        }
                    }]
                },
                {
                    test: /\.jsx$/,
                    include: [path.join(root_dir, "app"), path.join(root_dir, "node_modules/react-foundation-apps"), "/home/sigve/Dev/graphene/react-foundation-apps"],
                    use: [{
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: env.prod ? false : true
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: "babel-loader",
                    options: {
                        compact: false,
                        cacheDirectory: true
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
                    include: [
                        path.resolve(root_dir, "app/assets/"),
                    ],
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }]
                },
                {
                    test: /\.png$/,
                    exclude: [
                        path.resolve(root_dir, "app/assets/asset-symbols"),
                        path.resolve(root_dir, "app/assets/images"),
                        path.resolve(root_dir, "app/assets/language-dropdown/img"),
                    ],
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }]
                },

                {
                    test: /\.woff$/,
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 100000,
                            mimetype: "application/font-woff"
                        }
                    }]
                },
                {
                    test: /.*\.svg$/,
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
                app: path.resolve(root_dir, "app"),
            },
            modules: [
                "node_modules",
                path.resolve(root_dir, "app"),
                path.resolve(root_dir, "app/lib"),
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
            ],
        },
        plugins: plugins,
        node: {
            fs: "empty"
        },
    };

    return config;
};