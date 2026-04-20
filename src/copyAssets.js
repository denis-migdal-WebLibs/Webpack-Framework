import CopyWebpackPlugin from 'copy-webpack-plugin';

export default function(config, list) {

	if( list.length === 0)
		return config;

	let patterns = list.map( e => { return {from: e[0], to: e[1], info: { minimized: true }} } );

	config.plugins.push(
		new CopyWebpackPlugin({patterns}),
	);
	
	return config;
}