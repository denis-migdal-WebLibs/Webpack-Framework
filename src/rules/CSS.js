import {isEntry} from "./helpers.js";

/* const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function (config, src, dst) {
 
	config.module.rules.push({
		test  : /\.css$/,
		issuer: isEntry,
		// requires custom loader...
		/*type: 'asset/resource', // émet le CSS comme fichier
        generator: {
          filename: 'test.css'
        },*/
		use: [
            MiniCssExtractPlugin.loader, // necessary to produce the file from the result of css-loader
			/**
			{
				loader: "./build/WebpackFramework/src/loaders/test.js"
			},
			/**/
            {
				loader: 'css-loader',
				options: {
					url: false, // do not resolve URL.
					//exportType: 'css-style-sheet'
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