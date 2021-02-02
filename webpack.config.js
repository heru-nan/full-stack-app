const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, `src`, `app`),
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        },
      },
    plugins: [new HtmlWebpackPlugin({
        template: "./index.html"
    })],
    resolve:{
        extensions: ['.js', '.jsx']
    },
    devServer:{
        historyApiFallback: true
    },
    module:{
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    }
}