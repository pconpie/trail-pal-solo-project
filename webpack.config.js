module.exports = {
    entry: './server/public/scripts/client.js',
    output: {
        path: `${__dirname}/server/public/dist`,
        filename: 'solo-trail-pal-webpack.bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }

}