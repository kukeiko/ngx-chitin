import * as Webpack from "webpack";
// import { paths } from "./constants";
// import { Environment } from "./environment";
// import { root } from "./helpers";

// let path = require("path");

// export interface ILoaderArgs {
//     env: Environment;
//     include?: Array<string>;
//     exclude?: any;
// }

// function rootifyRelative(paths: Array<string>) {
//     return paths.map((item) => {
//         if (path.isAbsolute(item)) {
//             return item;
//         }

//         return root(item);
//     });
// }

type Loader = Webpack.NewLoaderRule;
type Use = Webpack.NewUseRule;
type Rules = Webpack.RulesRule;

export const loaders = {
    typescript: () => {
        let atlOptions = [
            "forkChecker=true",
            "useCache=true"
        ];

        console.warn("*******************************************");
        console.warn("*********** USING ES6 AS TARGET ***********");
        console.warn("*******************************************");
        atlOptions.push("target=es6");

        return <Loader>{
            test: /\.ts$/,
            // exclude: /node_modules/,
            loader: "awesome-typescript-loader?" + atlOptions.join("&")
        };
    },
    globalStyles: () => {
        return <Use>{
            test: (path: string) => {
                return path.match(/\.(css|scss|sass)/) && !path.includes(".cm.");
            },
            use: [
                <Loader>{ loader: "style-loader" },
                <Loader>{ loader: "css-loader" },
                <Loader>{ loader: "sass-loader" }
            ]
        }
    },
    ngxComponents: () => {
        return <Rules>{
            rules: [
                <Use>{
                    test: (path: string) => {
                        return path.endsWith(".cm.scss");
                    },
                    use: [
                        <Loader>{ loader: "to-string-loader" },
                        <Loader>{ loader: "css-loader" },
                        <Loader>{ loader: "sass-loader" }
                    ]
                },
                <Loader>{
                    test: /\.html/,
                    exclude: /node_modules/,
                    loader: "html-loader"
                }
            ]
        };
    }
};
