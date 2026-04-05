import ForkTsCheckerWebpackPlugin         from 'fork-ts-checker-webpack-plugin';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';

export default function(config, src, _, {ROOT, alias}) {

	config.module.rules.push(
		{
			test: /\.tsx?$/,
			use: [{
					// awesome-typescript-loader ?
					//loader: 'ts-loader',
					loader: 'swc-loader',
					options: {
						jsc: {
							"target": "esnext",
						},
						//transpileOnly: true, // Build time : 20sec to 10sec...
						//experimentalWatchApi: true,
					},
				},],
			exclude: [ /node_modules/ ]
		},
		// raw loading...
		{
			//TODO: minify (?).
			test  : /\.(html|css)$/,
			issuer: /\.ts$/,
			type  : 'asset/source',
		}
	);

	config.plugins.push(
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				build: true,
				mode: 'write-references',
			}
		}),
		new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: false }),
	);

	config.resolve = {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [
			ROOT,
			'node_modules',
		],
		alias,
		fallback: {
            "fs"    : false,
            "path"  : false,
            "crypto": false
        },
	}

	//const WORKER_PREFIX = 'TS.Worker.';

	/*for(let worker_name in workers) {
		config.entry[`${WORKER_PREFIX}${worker_name}`] = workers[worker_name][0];
	}*/

	config.experiments = {
		outputModule: true
	}

	config.output.filename = (args) => {
		
		const runtime = args.chunk.name;

		if( runtime === "main" )
			return `index.js`;

		return `${runtime}/index.js`;

		//let worker_name = runtime.slice(WORKER_PREFIX.length);
		//return `${workers[worker_name][1]}/index.js`;
	}

	//TODO: .d.ts bundle

};