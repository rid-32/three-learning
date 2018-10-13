const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ConfigWebpackPlugin = require('config-webpack')

const is_dev = process.env.NODE_ENV === 'development'

const mode = process.env.NODE_ENV || 'production'

const rootAssetPath = path.join(__dirname, 'assets')

const plugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
    }),
    new CleanWebpackPlugin('build', {}),
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(require('config')) }),
    new ConfigWebpackPlugin(),
]

const jsxLoader = {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['react', 'env', 'stage-1'],
                // plugins: ['transform-decorators-legacy'],
            },
        },
    },
    svgInlineLoader = {
        test: /\.inlinesvg$/,
        loader: 'svg-inline-loader',
    },
    alias = {
        Assets: path.resolve(__dirname, 'assets'),
        UI: path.resolve(__dirname, 'src/UI'),
        Stylesheets: path.resolve(__dirname, 'src/Stylesheets'),
    },
    extensions = ['.js', '.jsx', '.json', '.scss', '.css']

module.exports = {
    mode,
    entry: [path.join(__dirname, '/src/index.js')],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[hash].js',
    },
    resolve: {
        alias,
        extensions,
    },
    module: {
        rules: [
            jsxLoader,
            {
                test: /\.(s)?css$/,
                use: [
                    {
                        loader: is_dev
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            svgInlineLoader,
            {
                //eslint-disable-next-line
                test: /\.(wav|webm|mp3|woff|woff2|ttf|eot|svg|png|jpe?g|gif|ico)(\?.*)?$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash].[ext]',
                        context: rootAssetPath,
                    },
                },
            },
        ],
    },
    plugins,
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
}
