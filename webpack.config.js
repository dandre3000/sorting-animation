const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

let config = {
	name: 'main',
	mode: process.env.NODE_ENV || 'production', // production
	target: 'web',
	entry: {
		app: './src/main-entry.js' // ./src/index.js
	},
	output: {
		path: path.resolve(__dirname, 'dist'), // dist
		publicPath: './',
		filename: 'main.bundle.js' // main.js
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env']
						}
					},
					{
						loader: 'eslint-loader',
						options: {
							cache: true,
						}
					}
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false,
							name: '[name].[ext]',
							outputPath: 'assets/images/'
						}
					},
				],
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			protectWebpackAssets: false
		}),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			inject: 'head',
			template: './src/index.html',
			filename: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: `http://localhost:8080/dist/`,
		hot: true,
		// writeToDisk: true
	},
	devtool: 'source-map'
}

module.exports = config