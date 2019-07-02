const path = require('path');
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, 'src', 'js'),
  mode: 'development',

  devServer: {
    port: 8000,
    contentBase: './dist',
  },

  entry: {
    main: ['./main.js'],
  },

  output: {
    path : path.resolve(__dirname, 'dist'),
    filename  : '[name].js',
    publicPath : `http://localhost:8000`,
  }
};