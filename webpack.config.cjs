const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, pkg.main),
  },
  output: {
    ecmaVersion: 5,
    filename: `[name].js`,
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', { loader: 'clean-css-loader', options: { level: 2, compatibility: 'ie7' }}],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: { iesafe: true, }
        }
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
      new TerserPlugin({terserOptions: { ecma: 5, safari10: true, ie8: true }),
      new OptimizeCssAssetsPlugin(),
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
