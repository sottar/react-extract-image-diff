const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const projectRootPath = path.resolve(__dirname, 'sample', 'src');
const publicPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    app: [path.join(projectRootPath, 'index.tsx')].filter(Boolean),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(projectRootPath, 'index.html'),
      filename: 'index.html',
      inject: 'body',
      chunksSortMode: 'none',
    }),
    new webpack.DefinePlugin({
      'process.env': {},
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      minimize: false,
    }),
  ],
  output: {
    path: publicPath,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
    descriptionFiles: ['package.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts|.tsx$/,
        use: 'ts-loader',
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    port: 8080,
    inline: true,
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    // to make dev server http2 compliant
    disableHostCheck: true,
  },
  devtool: 'inline-source-map',
};
