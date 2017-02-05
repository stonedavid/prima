//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');
var mongoose = require("mongoose");

var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var config = require("./webpack.config.js");

// mongoose.connect(MONGODB ADDRESS)

var router = express();
const compiler = webpack(config);
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

router.get('*', function (request, response){
  response.sendfile(path.resolve(__dirname, 'client', 'index.html'));
});

router.use(express.bodyParser());

/*router.use(webpackMiddleware(compiler, {
  hot: true,
  filename: "bundle.js",
  publicPath: config.output.publicPath,
  stats: {colors: true},
  historyApiFallback: true
}));

router.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: "/__webpack_hmr",
  heartbeat: 10 * 1000,
}));*/

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
