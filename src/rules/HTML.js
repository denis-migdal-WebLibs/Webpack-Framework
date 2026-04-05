import {isEntry} from "./helpers.js";

export default function(config, src) {

	config.module.rules.push({
        test  : /\.html$/,
        issuer: isEntry,
        use: [{
            /*loader: "html-loader",*/
            loader: 'file-loader',
            options: {
                name: (filepath) => {

                    // h4ck due to symlink... dunno how to solve it...
                    if( filepath === "/home/demigda/Data/Recherche/Git/Cours/libs/TPEngine/src/index.html")
                        filepath = "/home/demigda/Data/Recherche/Git/Cours/src/pages/TPEngine/index.html";

                    const idx = filepath.indexOf(src.slice(1));
                    return filepath.slice(idx + src.length + 6 - 1);
                }
            }
        }],
    });
};