module.exports = {
    entry: "./app/index.js",
    mode: "production",
    output: {
        path: "/home/mynk96/ai/build",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/    
            }
            
        ]
    },
    devServer: {
        port:3000,
        contentBase: '/home/mynk96/ai/build',
        inline: true,
        host:'10.4.7.239'
    }
}