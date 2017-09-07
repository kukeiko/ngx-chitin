import * as chalk from "chalk";
import * as fs from "fs";
import * as path from "path";

const root = path.resolve(__dirname, "..");

export function rootify(...args: string[]): string {
    return path.join(root, ...args);
}

export const outputPath = rootify("dist");
