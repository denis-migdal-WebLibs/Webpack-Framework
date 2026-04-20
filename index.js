import buildConfig from './src/buildConfig.js';
import listAssets from './src/listAssets.js';
import listEntries from './src/listEntries.js';
import * as RULES from './src/rules/index.js';

const rules = [
        RULES.Typescript,
        //RULES.Images,
        RULES.CSS,
        RULES.HTML,
        //RULES.Markdown
    ]; //TODO: auto build.

export default function buildConfigs({
                                        src   = "./src/",
                                        dst   = "./dist/${version}/",
                                        alias = {}
                                    } = {}) {

    return (env, args) => {

        const version = args.mode === "production" ? 'prod' : 'dev';
        console.log('=== Building version:', version, "===");
        dst = dst.replaceAll("${version}", version);
        
        const entries = listEntries(src);
        const assets  = listAssets(src);

        const config = buildConfig(src, dst, rules, {
            assets,
            entries,
            mode: args.mode,
            alias
        });

        return config;
    }
}