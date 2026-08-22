import {isEntry} from "./core/helpers.js";

export default function(config, src) {

	config.module.rules.push({
        test  : /\.html$/,
        issuer: isEntry,
        type  : "asset/resource",
        generator: {
            filename: ({filename}) => {
                const idx = filename.indexOf(src.slice(1));
                return filename.slice(idx + src.length + 6 - 1);
            }
        }
    });
};