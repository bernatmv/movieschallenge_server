var fs = require('fs');
var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });

module.exports = {
    target: "node",
    resolve: {
        extensions: ['', '.node', '.json', '.js']
    },
    entry: './src/server/server.js',
    output: {
        path: './src/server',
        publicPath: './src/server/',
        filename: 'server_compiled.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.node$/,
            loader: "node-loader"
        }]
    },
    externals: node_modules,
    stats: {
        colors: true
    },
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
    watch: false,
    keepalive: true
};