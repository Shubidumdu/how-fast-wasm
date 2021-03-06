const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ?
  MiniCssExtractPlugin.loader :
  'style-loader';

const config = {
  cache: false,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    open: false,
    hot: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  experiments: {
    asyncWebAssembly: true,
  },
};

const worker = {
  entry: "./src/dfs.worker.ts",
  output: {
      filename: 'worker_name.worker.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: "dist/"
  },
  target: "webworker",
  devtool: "source-map",
  mode: "development",
  resolve: {
      modules: [
          'src',
          'node_modules'
      ],
      extensions: [
          '.js',
          '.ts',
          '.tsx'
      ],
      plugins: [],
  },
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              options: {
                  transpileOnly: true,
              },
          },
      ],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
