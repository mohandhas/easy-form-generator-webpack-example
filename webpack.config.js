const webpack      = require('webpack');
const path         = require('path');
const autoprefixer = require('autoprefixer');
const precss       = require('precss');

const assetsDir       = path.resolve(__dirname, 'public/assets');
const nodeModulesDir  = path.resolve(__dirname, 'node_modules');

const config = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/index.js')
  ], 
  output: {
    path: assetsDir,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesDir]
    }, {
      test: /\.scss$/,
      loader: 'style!css!postcss!sass'
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
      loader: 'url?limit=100000@name=[name][ext]'
    }]
  },
  postcss: function () {
    return [precss, autoprefixer({ browsers: ['last 2 versions'] })];
  },
  plugins: [
    getImplicitGlobals(),
    setNodeEnv()
  ]
};

function getImplicitGlobals() {
  return new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  });
}

function setNodeEnv() {
  return new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('dev')
    }
  });
}

module.exports = config;