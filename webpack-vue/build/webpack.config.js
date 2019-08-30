const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, '../src/main.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash:8].js',
		chunkFilename: 'js/[name].[hash:8].js',
		publicPath: './'
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.runtime.esm.js'
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					'cache-loader',
					'thread-loader',
					{
						loader: 'vue-loader',
						options: {
							compilerOptions: {
								preserveWhitespace: false
							}
						}
					}
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					'cache-loader',
					'thread-loader',
					'babel-loader'
				]
			},
			{
				test: /\.(css|less)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({
									browsersList: ['last 5 versions']
								})
							]
						}
					},
					'less-loader',
				]
			},
			{
				test: /\.(jpg|png|gif|jpeg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'assets/imgs/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'assets/medias/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'assets/fonts/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html')
		}),
		new webpack.NamedModulesPlugin(),	// 开启HMR(热模块替换，即下面的插件)时，显示模块的相对路径
		new webpack.HotModuleReplacementPlugin(),	// HMR 热模块替换
		new VueLoaderPlugin(),
	],
	devServer: {
		hot: true,
		port: 3000,
		contentBase: path.resolve(__dirname, '../dist')
	}
}