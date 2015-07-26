var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    target: "node",
    resolve: {
        extensions: ['', '.node', '.json', '.js']
    },
    entry: './src/server/server.js',
    output: {
        path: './build',
        filename: 'server_compiled.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            //exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.node$/,
            loader: "node-loader"
        }]
    },
    externals: nodeModules,
    stats: {
        colors: true
    },
    /*
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: "mock",
        __dirname: "mock",
        setImmediate: true,
        fs: "empty",
        tls: "empty",
        net: "empty"
    },
    */
    watch: false,
    keepalive: false
};