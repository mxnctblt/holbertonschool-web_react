const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { header: './modules/header/header.js',
   body: './modules/body/body.js', 
   footer: './modules/footer/footer.js',
},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
          test: /\.css$/i,
          use: [
              'style-loader',
              'css-loader'
          ]
      },
      {
          test: /\.(gif|png|jpe?g|svg)$/i,
          type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'task_3'
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: './public'
   },
    port: 8564,
  },
};
