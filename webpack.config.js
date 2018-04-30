const path = require("path");
module.exports = {
    entry: "./app/index.js",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
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
        contentBase: path.join(__dirname, 'build'),
        inline: true
    }
}
