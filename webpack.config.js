var webpack = require("webpack");
var path = require("path");

module.exports = {
    cache: true,
    context: __dirname,
    devtool: "cheap-module-source-map",
    
    entry: [
        "babel-polyfill",
        "./client/app/main.js"
        ],
    
    output: {
        path: __dirname + "/client",
        publicPath: "https://prima-dxstone.c9users.io/",
        filename: "bundle.js"
    },
    
    plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        drop_console: true,
        unsafe_comps: true,
        comparisons: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: [
                  path.join(__dirname, "client")
                ],
                query: {
                  cacheDirectory: true,
                  plugins: ["transform-regenerator"],
                  presets: ["react","es2015","stage-0","stage-1"]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/, 
                exclude: /node_modules/,
                loader: 'file-loader?name=webpackImages/[name].[ext]'
            }
        ]
    },
};