const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  entry: './src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react' ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
    ],
  },
  resolve: {
    extensions: [ '.jsx', '.js' ],
    fallback: {
      "fs": false
    },
  },
  devServer: {
    hot: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
  ],
})