var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

var path = require('path');
var buildDir = './dist';
var chunkNamePattern = "[id].lib.js";

module.exports = {
  entry: {
    app: ['./src/app.js'],
    lib: ['hash-change']
  },
  output: {
    publicPath: "assets/",
    path: path.join(path.resolve(buildDir), 'assets'),
    filename: 'bundle.js',
    chunkFilename: chunkNamePattern
  },
  //devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, exlcude: /\.useable\.css$/, loader: "style!css" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new OccurrenceOrderPlugin(),
    new CommonsChunkPlugin({
     name: 'lib',
     filename: 'lib.bundle.js',
    }),
    
    // new UglifyJsPlugin({
    //   exclude: [],
    //   compress: {
    //     warnings: false,
    //   },
    //   sourceMap: true,
    //   mangle: {
    //     except: ['$', 'exports', 'require']
    //   }
    // }),
    
    new ExtractTextPlugin("[name].css", { allChunks: true }),
  ],
  resolve: {
    moduleDirectories: ['node_modules', 'bower_components', 'web_modules']
  },
  target: "web"
};