var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
//var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
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
  module: {
    loaders: [
      { test: /\.css$/, exlcude: /\.useable\.css$/, loader: 'style/url!file!' },
      { test: /\.useable\.css$/, loader: "style/useable!css" }
    ]
  },
  plugins: [
    //new OccurenceOrderPlugin(),
    new CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
  resolve: {
    moduleDirectories: ['node_modules', 'bower_components', 'web_modules']
  },
  target: "web"
};