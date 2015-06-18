module.exports = {
    resolve: {
        extensions: ['', '.js']
    },
    entry: './src/server/server.js',
    output: {
        path: './build',
        publicPath: '/public',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    watch: false,
    keepalive: true
};