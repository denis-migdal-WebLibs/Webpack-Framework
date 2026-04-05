import skeleton from './src/skeleton.js';
import {glob, globSync} from 'glob';
import fs    from 'fs';

import * as RULES from './src/rules/index.js';
const rules = [
        RULES.Typescript,
        //RULES.Images,
        RULES.CSS,
        RULES.HTML,
        //RULES.Markdown
    ]; //TODO: auto build.

export default function buildConfigs(src, dst, alias) { //TODO: multiple named target.

    return (env, args) => {

        const version = args.mode === "production" ? 'prod' : 'dev';
        console.log('=== Building version:', version, "===");

        dst = dst.replaceAll("${version}", version);

        const assets = [];

        const res = globSync(src + '/pages/**/assets/*', {dotRelative: true});
        for(let i = 0; i < res.length; ++i)
            assets.push([res[i], "./" + res[i].slice(`${src}/pages`.length) ]);

        if( fs.existsSync(`${src}/assets`) )
            assets.push([`${src}/assets`, "./assets"]);

        if( fs.existsSync(`${src}/pages/404.html`) ) {
            const prefix = src.includes('V3') ? '..' : '.';
            assets.push([`${src}/pages/404.html`, `${prefix}/404.html`]);
        }

        const config = skeleton(src, dst, rules, {
            assets,
            mode: args.mode,
            alias
        });

        //console.log(JSON.stringify(config, null, "\t"));
        //config.entry().then( (e) => { console.warn(e) } )

        return config;
    }
}