import initializeProject from './utility/init/initCmd.js';
import devCommand from './utility/dev/devCmd.js';
import { exit } from 'node:process';
import buildProject from "./utility/build/buildCmd.js";

const DEV_MODE: boolean = process.env.NODE_ENV !== "production";
const HELP_SCREEN = `zyro.js zyxi (cli) help:

commands:
    - init <folder>     initialize a new project
    - dev               run in development mode
    - build             build project
    - help              show this screen
    - version           show version
`.trimEnd();

async function main(args: string[]) {
    if(args.length < 1) showHelp();
    if(DEV_MODE) console.log("Starting in dev mode...\n");

    let command = args[0];
    let commandArgs = args.slice(1);

    if(DEV_MODE) {
        switch(command) {
            case "dev": {
                devCommand();
                return; 
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
                console.log("zyro.js / zyxi : 0.0.2");
                break;
            }

            case "build": {
                buildProject(DEV_MODE);
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
                console.log("zyro.js / tip : 0.0.1");
                break;
            }

            case "build": {
                buildProject(DEV_MODE);
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
