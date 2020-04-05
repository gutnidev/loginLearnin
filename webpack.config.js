	const webpack = require('webpack');
	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const MiniCssExtractPlugin = require('mini-css-extract-plugin');
	const TerserPlugin = require('terser-webpack-plugin');
	const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
	const { CleanWebpackPlugin } = require('clean-webpack-plugin');
	const isProduct = true;
	
	
	module.exports = {
		mode: 'production',
		context: path.resolve(__dirname, 'src'),
		
		entry: {
			polyfill: '@babel/polyfill',
			main: './index.js',
		},
		output: {
			filename: '[name].[hash].js',
			path: path.resolve(__dirname, 'dist'),
		},
		resolve: {
			extensions: ['.js'],
			alias: {
				'@src': path.resolve(__dirname, 'src'),
			},
		},
		optimization: {
			minimize: isProduct,
			minimizer: [
				new TerserPlugin({
				exclude: '../node_modules'
				}),
				new OptimizeCssAssetsPlugin(),
			],
		},
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			host: '0.0.0.0' /*`localhost`*/ ,
			noInfo: false,
			port: 9000,
			useLocalIp: true,
			
		},
		plugins: [
			new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
				Popper: 'popper.js',
			}),
			new HtmlWebpackPlugin({
				template: './index.html',
				minify: isProduct,
			}),
			new MiniCssExtractPlugin({
				filename: '[name].[hash].css',
				chunkFilename: '[name].[hash].css',
			}),
			new CleanWebpackPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "babel-loader",
					options: {
					  "presets": [
					    [
					      "@babel/preset-env",
					    ],
					  ],
					},
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader', // Run post css actions,
							options: {
								plugins: function () {
									return [
                          require('precss'),
                          require('autoprefixer')
                        ];
								}
							},
						},
						{
							loader: 'sass-loader'
						},
					],
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader'
						},
						{
              loader: 'postcss-loader',
              options: {
								plugins: function () {
									return [
                          require('precss'),
                          require('autoprefixer')
                  ];
								}
							},
            },
					],
				},
			],
		}
	};