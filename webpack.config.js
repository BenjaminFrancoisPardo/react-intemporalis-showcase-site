const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

class RunAfterCompile {
	apply(compiler) {
		compiler.hooks.done.tap('Copy files', function () {
			fse.copySync('./app/assets', './public/assets');
			fse.copySync('./app/favicon.ico', './public/favicon.ico');
			/*
        If you needed to copy another file or folder
        such as your "images" folder, you could just
        call fse.copySync() as many times as you need
        here to cover all of your files/folders.
      */
		});
	}
}

config = {
	entry: path.join(__dirname, 'app', 'Main.js'),
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'app'),
		filename: 'main-bundled.js',
	},
	plugins: [
		new Dotenv(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'app/index-template.html',
			alwaysWriteToDisk: true,
		}),
		new HtmlWebpackHarddiskPlugin(),
	],
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['autoprefixer'],
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									useBuiltIns: 'usage',
									corejs: 3,
								},
							],
							'@babel/preset-react',
						],
					},
				},
			},
		],
	},
};

if (currentTask == 'dev') {
	config.devtool = 'source-map';
	config.devServer = {
		port: 3000,
		static: {
			directory: path.join(__dirname, 'app'),
		},
		hot: true,
		liveReload: false,
		historyApiFallback: { index: 'index.html' },
	};
}

if (currentTask == 'build') {
	config.plugins.push(new CleanWebpackPlugin(), new RunAfterCompile());
	config.mode = 'production';
	config.output = {
		publicPath: '/',
		path: path.resolve(__dirname, 'public'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
	};
}

module.exports = config;
