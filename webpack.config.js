const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const DotEnv = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = env => {
  return {
    mode: env,
    target: 'node',
    entry: {
      server: "./src/server.ts"
    },
    externals: nodeModules,
    output: {
      path: __dirname + '/dist',
      pathinfo: true,
      filename: env === 'production' ? `${version}.bundle.js` : '[name].bundle.js'
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        '@vars': path.resolve(__dirname, './src/config/vars'),
        '@api': path.resolve(__dirname, './src/api/v1/'),
        '@models': path.resolve(__dirname, './src/api/@models/index.ts'),
        '@services': path.resolve(__dirname, './src/api/@services'),
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        '@vars': '@vars',
        '@api': '@api',
        '@models': '@models',
        '@services': '@services',
      }),
      new DotEnv({
        path: path.resolve(__dirname, './.env'),
        safe: path.resolve(__dirname, './.env.example'),
        systemvars: false,
        silent: false
      }),
      new NodemonPlugin()
    ]
  }
};
