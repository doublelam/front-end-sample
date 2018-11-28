const path = require('path');
const SRC = path.join(__dirname, 'front-src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
module.exports = {
  mode: "development",
  entry: {
    home: './src/script/ts/home.ts',
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'js/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['home'],
      template: './src/docs/pugs/home.pug',
      filename: 'html/home.html',
      hash: true
    }),
    new MiniCssExtract({
      filename: "style/[name].css"
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/i,
      use: 'ts-loader'
    }, {
      test: /\.pug$/i,
      use: 'pug-loader'
    }, {
      test: /\.s(a|c)ss$/i,
      use: [MiniCssExtract.loader, 'css-loader', 'sass-loader']
    }, {
      test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'files/[name].[ext]?[hash]'
        }
      }],
    },
    ],
  },

}