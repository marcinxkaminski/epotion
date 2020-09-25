const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const package_ = require('./package.json');

module.exports = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, package_.main),  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ chunks: ['index'], template: 'src/index.html' }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })
  ],
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', { loader: 'clean-css-loader', options: { level: 2 } }],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: { iesafe: true },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    compress: true,
    https: true,
    port: 2000,
    open: true,
    hot: true,
  },
};
