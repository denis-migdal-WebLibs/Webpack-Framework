import {glob, globSync} from 'glob';
import fs from 'fs';

export default function listEntries(src) {

    return async () => {

        const entries = {};

        // pages entries
        const files = await glob(src + '/pages/**/index.{ts,html,css}', {dotRelative: true});

        for(let file of files) {

            const entry_name = file.slice(src.length + 6, file.lastIndexOf('/') );

            let entry = entries[entry_name];
            if(entry === undefined)
                entry = entries[entry_name]= { import: []};

            const isSkeleton = entry_name.startsWith("skeleton");
            const isWebPage  = file.endsWith('.html');
            
            if( isWebPage && ! isSkeleton) {

                //let dependsOn = "skeleton"; // default.
                const content = fs.readFileSync(file, {encoding: "utf8"});
                
                const found = content.match(/src="\/(skeleton\/(.*))index.js"/);
                if( found !== null) {
                    const r = found[1].slice(0,-1);
                    entry.dependOn = [r];
                }
            }

            entry.import.push(file);
        }

        const libs = await glob(src + '/libs/**/index.ts', {dotRelative: true});   
        for(let lib of libs) {

            const entry_name = lib.slice(src.length, lib.lastIndexOf('/') );

            entries[entry_name]= {
                import: [ lib ],
                library: {
                    //name: entry_name.slice(5),
                    type: "module", // ""modern-module"
                }
            };

        }

        return entries;
    }
}