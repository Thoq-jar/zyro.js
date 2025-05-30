import { exit } from 'node:process';
import initializeProject from './utility/init/initCmd.js';
import compile from './compiler/compiler.js';
import { HOME_CUM_FILE } from './utility/init/constants.js';

const HELP_SCREEN = `cumshot.js tip (cli) help:

commands:
    - init <folder>     initialize a new project
    - dev               run in development mode
    - build             build project
    - help              show this screen
    - verison           show version
`.trimEnd();

function main(args: string[]) {
    if(args.length < 1) showHelp();

    let command = args[0];
    let commandArgs = args.slice(1);

    switch(command) {
        case "dev":
            console.log("Not implemented yet!");
            break;
        case "init":
            const folder = commandArgs[0];
            if(!folder) {
                console.log("No folder specified!");
                showHelp();
            }
            initializeProject(folder);
            break;
        case "version":
            console.log("cumshot.js / tip : 0.0.1");
            break;
        case "build":
            console.log("Not implemented yet!");
            break;
        case "help":
            console.log(HELP_SCREEN);
            break;
        case "compile":
            compile(HOME_CUM_FILE)
            break;
        default:
            showHelp();
            break;    
    }

    exit(0);
}

function showHelp() {
    console.log(HELP_SCREEN);
    exit(0);
}

const args: string[] = process.argv.slice(2);
main(args);
