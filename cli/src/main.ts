import { exit } from 'node:process';
import initializeProject from './utility/init/initCmd.js';
import compile from './compiler/compiler.js';
import { readFindFilesInDir } from './utility/fsHelpers.js';
import fs from "node:fs"
import path from 'node:path';
import { OUT_DIR } from './utility/init/constants.js';

const DEV_MODE: boolean = process.env.NODE_ENV !== "production";

const HELP_SCREEN = `cumshot.js tip (cli) help:

commands:
    - init <folder>     initialize a new project
    - dev               run in development mode
    - build             build project
    - help              show this screen
    - version           show version
`.trimEnd();

async function main(args: string[]) {
    if(args.length < 1) showHelp();

    if(DEV_MODE) console.log("Starting in dev mode...");

    let command = args[0];
    let commandArgs = args.slice(1);

    if(DEV_MODE) {
        switch(command) {
            case "dev": {
                console.log("Not implemented yet!");
                break;
            }
    
            case "init": {
                const folder = commandArgs[0];
                if(!folder) {
                    console.log("No folder specified!");
                    showHelp();
                }
    
                initializeProject(folder);
                break;
            }
    
            case "version": {
                console.log("cumshot.js / tip : 0.0.1");
                break;
            }
    
            case "build": {
                console.log("Building for production...");
                process.chdir("testInit");

                let filesToCompile = readFindFilesInDir("app", ".cum");

                for(const file of filesToCompile) {
                    console.log(`Building ${file}...`)
                    const compiled = await compile(fs.readFileSync(file, "utf-8"));
                    const outputPath = path.join(path.resolve(__dirname, '../'), OUT_DIR, file);

                    if(!fs.existsSync(path.dirname(outputPath))) {
                        console.warn(`${OUT_DIR} doesnt exist! Creating...`);
                        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
                    }

                    console.log(`Built ${file} sucessfully!`);
                    console.log(`DEBUG: Output path: ${outputPath}`);
                    fs.writeFileSync(outputPath, compiled);
                }

                break;
            }
    
            case "help": {
                console.log(HELP_SCREEN);
                break;
            }
    
            default: {
                showHelp();
                break;
            }
        }
    } else {
        switch(command) {
            case "dev": {
                console.log("Not implemented yet!");
                break;
            }
    
            case "init": {
                const folder = commandArgs[0];
                if(!folder) {
                    console.log("No folder specified!");
                    showHelp();
                }
    
                initializeProject(folder);
                break;
            }
    
            case "version": {
                console.log("cumshot.js / tip : 0.0.1");
                break;
            }
    
            case "build": {
                console.log("Building for production...");

                let filesToCompile = readFindFilesInDir("app", ".cum");

                for(const file of filesToCompile) {
                    console.log(`Building ${file}...`)
                    const compiled = await compile(fs.readFileSync(file, "utf-8"));
                    const outputPath = path.join(path.resolve(__dirname, '../'), OUT_DIR, file);

                    if(!fs.existsSync(path.dirname(outputPath))) {
                        console.warn(`${OUT_DIR} doesnt exist! Creating...`);
                        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
                    }

                    console.log(`Built ${file} sucessfully!`);
                    console.log(`DEBUG: Output path: ${outputPath}`);
                    fs.writeFileSync(outputPath, compiled);
                }

                break;
            }
    
            case "help": {
                console.log(HELP_SCREEN);
                break;
            }
    
            default: {
                showHelp();
                break;
            }
        }
    }

    exit(0);
}

function showHelp() {
    console.log(HELP_SCREEN);
    exit(0);
}

const args: string[] = process.argv.slice(2);
main(args);
