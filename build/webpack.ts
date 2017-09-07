import * as Webpack from "webpack";
import * as WebpackHtmlPlugin from "html-webpack-plugin";

import { HTML_ENTRY, SCRIPT_ENTRY, PORT, SRC_ALIAS } from "./constants";
import { rootify, outputPath } from "./helpers";
import { loaders } from "./loaders";

module.exports = (() => {
    let cfg: Webpack.Configuration = {
        plugins: []
    };

    cfg.devtool = "cheap-module-source-map";

    cfg.entry = <Webpack.Entry>{
        app: rootify(SCRIPT_ENTRY)
    };

    cfg.output = <Webpack.Output>{
        path: outputPath,
        filename: "[name].js",
        // publicPath: "http://localhost:7777"
    };

    cfg.devServer = {
        port: PORT,
        stats: "minimal",
        watchOptions: {
            ignored: /(build)/
        }
    };

    cfg.plugins.push(new WebpackHtmlPlugin({
        template: HTML_ENTRY
    }));

    cfg.plugins.push(new Webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, rootify("src")));

    cfg.module = <Webpack.NewModule>{
        rules: [
            loaders.typescript(),
            loaders.globalStyles(),
            loaders.ngxComponents()
        ]
    };

    let alias: { [key: string]: string } = {};

    for (let k in SRC_ALIAS) {
        alias[k] = rootify(SRC_ALIAS[k]);
    }

    if (Object.keys(alias).length > 0) {
        cfg.resolve = <Webpack.Resolve>{
            alias: alias,
            extensions: [".ts", ".js", ".json", ".css", ".scss", ".html"]
        };
    }

    return cfg;
})();
