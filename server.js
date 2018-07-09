var path = require("path");
var webpack = require("webpack");
var express = require("express");
var devMiddleware = require("webpack-dev-middleware");
var hotMiddleware = require("webpack-hot-middleware");
var feathers = require("feathers");
const https = require("https");
const fs = require("fs");
const expressproxy = require('express-http-proxy');
let proxyUrl = 'http://106.14.159.224:3049/';

var ProgressPlugin = require("webpack/lib/ProgressPlugin");
var config = require("./config/webpack.dev.js");

var app = express();
app.use('/api/', expressproxy(proxyUrl, {
    proxyReqPathResolver: function(req,res) {
        return '/api' + require('url').parse(req.url).path;
    }
}));
var compiler = webpack(config);

compiler.apply(
  new ProgressPlugin(function(percentage, msg) {
    process.stdout.write(
      (percentage * 100).toFixed(2) + "% " + msg + "                 \033[0G"
    );
  })
);

app.use(
  devMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.use(hotMiddleware(compiler));

app.use("*", function(req, res, next) {
  var filename = path.join(compiler.outputPath, "index.html");
  compiler.outputFileSystem.readFile(filename, function(err, result) {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

app.listen(8080, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log("Listening at http://localhost:8080/");
});
const options = {
  key: fs.readFileSync(path.resolve(__dirname, "ssl/private.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "ssl/cert.crt"))
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(8081);

// new WebpackDevServer(compiler, {
//     publicPath: config.output.publicPath,
//     hot: true,
//     historyApiFallback: true,
//     quiet: false,
//     stats: {colors: true},
//     port: 8080
// }).listen(8080, '0.0.0.0', function (err, result) {
//     if (err) {
//         console.log(err);
//     }
//     console.log('Listening at 0.0.0.0:8080');
// });
