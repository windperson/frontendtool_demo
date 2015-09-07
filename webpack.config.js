var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var path = require('path');
var buildDir = './dist';
var chunkNamePattern = "[id].lib.js";
module.exports = {
  entry: {
    app: ['./src/app.js'],
    vendor: ['hash-change']
  },
  output: {
    publicPath: "assets/",
    path: path.join(path.resolve(buildDir), 'assets'),
    filename: 'bundle.js',
    chunkFilename: chunkNamePattern
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, exlcude: /\.useable\.css$/, loader: 'style/url!file!' },
      { test: /\.useable\.css$/, loader: "style/useable!css" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new OccurrenceOrderPlugin(),
    new CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new UglifyJsPlugin({
      exclude: [/\.css$/],
      compress: {
        warnings: false,
      },
      sourceMap : true,
      mangle: {
        except: ['$', 'exports', 'require']
      }
    })
  ],
  resolve: {
    moduleDirectories: ['node_modules', 'bower_components', 'web_modules']
  },
  target: "web"
};