import {isEntry} from "./helpers.js";

/* const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function (config, src, dst) {

    // optimize ? [MiniCssExtractPlugin.loader, 'css-loader', css_purge] : 
	config.module.rules.push({
		test  : /\.css$/,
		issuer: isEntry,
		use: [
            MiniCssExtractPlugin.loader,
            {
				loader: 'css-loader',
				options: {
					url: false
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