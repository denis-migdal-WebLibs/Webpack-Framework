import webpack from 'webpack';

import copyAssets  from './copyAssets.js';
import pageEntries from './entries.js';

//import { library } from 'webpack';
//const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
//const genCoreModuleList  = require('./genCoreModuleList');
//const genCoreRuntimeList = require('./genCoreRuntimeList');

export default function (src, dst, rules = [], options = {}) {

	let {assets} = options;

	let ROOT = process.cwd();
	options.ROOT = ROOT;

	let config = {
		module: {
			rules: [],
		},
		entry: pageEntries(src, dst),
		output: {
			path: `${ROOT}/${dst}`,
			publicPath: '',
			module: true,
			// modern-module causes issue in dev mode with concat true
			enabledLibraryTypes: ["module"],
			clean: {
				//dry: true
			},
		},
		target: "web",
        plugins: [
			new webpack.DefinePlugin({
				__DEBUG__: options.mode !== "production"
			}),
			/*{
            apply: (compiler) => {
                compiler.hooks.compile.tap("MyPlugin_compile", () => {
                	genCoreModuleList();
					genCoreRuntimeList();
                });
            },
        }*/],
		//watch: WATCH, no needs (--watch / --no-watch)
		watchOptions: {
			ignored: [	'**/node_modules',
						'**/.git' ]
		},
		devtool: "source-map", //"source-map"
		stats: {
 			"errorDetails": true
		},
		optimization: {
			//concatenateModules: false,
			//providedExports: false // issues in production ?
		},
	};

	for(let rule of rules)
		rule(config, src, dst, options);

	if(assets)
		copyAssets(config, assets);

	return config;
	//return smp.wrap( config );
}