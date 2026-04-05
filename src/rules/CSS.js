import {isEntry} from "./helpers.js";

/* const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function (config, src, dst) {
 
	config.module.rules.push({
		test  : /\.css$/,
		issuer: isEntry,
		use: [
            MiniCssExtractPlugin.loader, // necessary to produce the file from the result of css-loader
            {
				loader: 'css-loader',
				options: {
					url: false // do not resolve URL.
				}
			}
        ]
	});

	config.plugins.push(new MiniCssExtractPlugin({
		filename: ({chunk}) => { return `${chunk.name}/index.css` }
	}) );

	/*if( optimize ) {

		new CssMinimizerPlugin({
			minimizerOptions: {
				preset: [
					'default',
					{
						discardComments: { removeAll: true }
					}
				]
			}
		});
	}*/
}