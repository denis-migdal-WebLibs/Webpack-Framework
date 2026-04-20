import {glob, globSync} from 'glob';
import fs    from 'fs';

export default function listAssets(src) {

    const assets = [];

    const res = globSync(src + '/pages/**/assets/*', {dotRelative: true});
    for(let i = 0; i < res.length; ++i)
        assets.push([res[i], "./" + res[i].slice(`${src}/pages`.length) ]);

    if( fs.existsSync(`${src}/pages/404.html`) )
        assets.push([`${src}/pages/404.html`, `./404.html`]);

    return assets;
}