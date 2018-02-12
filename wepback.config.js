module.exports = {
    entry: './server/public/scripts/client.js',
    output: {
        path: `${__dirname}/server/dist`,
        filename: 'my-first-webpack.bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }

}