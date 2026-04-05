import {isEntry} from "./helpers.js";

export default function(config, src) {

	config.module.rules.push({
        test  : /\.html$/,
        issuer: isEntry,
        type  : "asset/resource",
        generator: {
            filename: ({filename}) => {

                // h4ck due to symlink... dunno how to solve it...
                if( filename === "/home/demigda/Data/Recherche/Git/Cours/libs/TPEngine/src/index.html")
                    filename = "/home/demigda/Data/Recherche/Git/Cours/src/pages/TPEngine/index.html";

                const idx = filename.indexOf(src.slice(1));
                return filename.slice(idx + src.length + 6 - 1);
            }
        }
    });
};