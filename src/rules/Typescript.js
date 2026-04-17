import ForkTsCheckerWebpackPlugin         from 'fork-ts-checker-webpack-plugin';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';

export default function(config, src, _, {ROOT, alias}) {

	config.module.rules.push(
		{
			test: /\.tsx?$/,
			exclude: [ /node_modules/ ],
			use: [{
					// emission quicker than 'ts-loader'.
					loader: 'swc-loader',
					options: {
						jsc: {
							"target": "esnext",
						},
					},
			},],
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
		tsconfig: `${ROOT}/tsconfig.json`,
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