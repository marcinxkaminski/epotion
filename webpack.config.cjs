/* eslint-disable eslint-comments/disable-enable-pair,unicorn/no-abusive-eslint-disable,eslint-comments/no-unlimited-disable */
/* eslint-disable */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (environment, argv) => ({
  target: 'web',
  entry:
    argv.mode === 'development'
      ? { demo: path.join(__dirname, 'demo/demo.js') }
      : path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'epotion.js',
  },
  plugins:
    argv.mode === 'development'
      ? [
          new HtmlWebpackPlugin({ chunks: ['demo'], template: 'demo/demo.html' }),
          new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
        ]
      : [new CleanWebpackPlugin()],
  module: {
    rules: [{ test: /\.m?js/, resolve: { fullySpecified: false } }],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    host: '0.0.0.0',
    port: 8080,
  },
});
