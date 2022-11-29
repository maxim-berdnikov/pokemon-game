const path = require("path");

module.exports = {
	entry: "./src/index.ts",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: "file-loader",
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public"),
	},
	mode: "development",
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		port: 9000,
		open: true,
		hot: true,
	},
};
