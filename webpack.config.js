var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nib = require('nib');

module.exports = {
	target: 'web',
	cache: false,
	context: __dirname,
	debug: true,
	entry: [ './src/js/index' ],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		chunkFilename: '[name].[id].js'
	},
	plugins: [
		new ExtractTextPlugin('bundle.css'),
		new HtmlWebpackPlugin({
			title: 'Periodic table of the chimical elements - A data visualization by vogelino',
			filename: 'index.html',
			template: './src/html/index.ejs',
			inject: 'body'
		})
	],
	module: {
		loaders: [
			{
				test: /\.json$/, loaders: [ 'json' ]
			},
			{
				test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
				loaders: [ 'file?context=static&name=/[name].[ext]?v=[hash:6]' ],
				exclude: /node_modules/
			},
			{
				test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loaders: [ 'file?context=static&name=/[path][name].[ext]' ],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loaders: [ 'babel?presets[]=es2015&presets[]=stage-0&presets[]=react' ],
				exclude: /node_modules/
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
			}
		]
	},
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules'
		],
		extensions: [ '', '.json', '.js' ]
	},
	stylus: {
		use: [ nib() ]
	}
};

