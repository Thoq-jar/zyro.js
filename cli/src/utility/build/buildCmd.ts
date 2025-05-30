import fs, { writeFileSync } from 'node:fs';
import path from 'node:path';
import compile from '../../compiler/compiler'; 
import { exit } from 'node:process';
import { readFindFilesInDir } from '../fsHelpers'; 
import { OUT_DIR, ERROR_PAGES } from '../constants'; 
import { formatError } from '../httpHelpers'; 
import { LogTree } from '../tuiHelper'; 

export default async function buildProject(devMode: boolean) {
    const logger = new LogTree();

    logger.info(`Starting build process... (Mode: ${devMode ? 'development' : 'production'})`);

    if (devMode) {
        try {
            process.chdir("testInit");
            logger.info("Switched to 'testInit' directory for development mode.");
        } catch (err: any) {
            logger.error(`Failed to switch to 'testInit' directory: ${err.message}`);
            exit(1);
        }
    }

    const relativePath = devMode ? '../../../testInit' : '../../'; 
    logger.enter().setLast(true); 
    logger.info("Initializing build environment...");

    logger.enter().setLast(false); 
    logger.info("Scanning for '.cum' files in 'app/' directory");
    let filesToCompile: string[];

    try {
        filesToCompile = readFindFilesInDir("app", ".cum");
        logger.success(`Found ${filesToCompile.length} '.cum' files to compile.`);
    } catch (error: any) {
        logger.error(`Error reading files: ${error.message}`);
        logger.exit(); 
        logger.exit(); 
        exit(1);
    }

    if (!filesToCompile.includes("app/home.cum")) {
        logger.error("CRITICAL: 'app/home.cum' not found. This file is required.");
        logger.info("Please ensure 'home.cum' exists in the 'app/' directory.");
        logger.exit(); 
        logger.exit(); 
        exit(1);
    } else {
        logger.success("'app/home.cum' found and validated.");
    }
    logger.exit(); 

    logger.enter().setLast(false); 
    logger.info("Building static error pages...");
    const errorPageEntries = Object.entries(ERROR_PAGES);
    if (errorPageEntries.length === 0) {
        logger.info("No error pages defined in ERROR_PAGES.");
    } else {
        for (let i = 0; i < errorPageEntries.length; i++) {
            const [code, message] = errorPageEntries[i];
            logger.enter().setLast(i === errorPageEntries.length - 1); 
            const numericCode = parseInt(code);

            try {
                const errorHtml = formatError({ code: numericCode, message });
                const errorDir = path.join(path.resolve(__dirname, relativePath, OUT_DIR, '.internal'));
                const outputPath = path.join(errorDir, `${numericCode}.html`);

                if (!fs.existsSync(errorDir)) {
                    fs.mkdirSync(errorDir, { recursive: true });
                    logger.info(`Created directory: ${errorDir}`);
                }
                writeFileSync(outputPath, errorHtml);
                logger.success(`Built ${numericCode}.html`);
            } catch (e: any) {
                logger.error(`Failed to build error page ${numericCode}.html: ${e.message}`);
            }

            logger.exit(); 
        }
    }
    logger.exit(); 

    logger.enter().setLast(true); 
    logger.info("Compiling '.cum' files to HTML...");
    if (filesToCompile.length === 0) {
        logger.info("No '.cum' files to compile.");
    } else {
        for (let i = 0; i < filesToCompile.length; i++) {
            const file = filesToCompile[i];

            logger.enter().setLast(i === filesToCompile.length - 1); 
            logger.info(`Processing: ${file}`);

            try {
                const fileContent = fs.readFileSync(file, "utf-8");
                const compiled = compile(fileContent); 

                let outputPath: string;
                const baseOutputDir = path.resolve(__dirname, relativePath, OUT_DIR);

                if (file.endsWith("app/home.cum") || file === "app/home.cum") { 
                    outputPath = path.join(baseOutputDir, "index.html");
                } else {
                    const fileDirRelative = path.dirname(file.substring("app/".length));
                    const fileName = path.basename(file, ".cum");
                    const outputDirSpecific = path.join(baseOutputDir, fileDirRelative);
                    outputPath = path.join(outputDirSpecific, `${fileName}.html`);
                }

                const outputDirForFile = path.dirname(outputPath);
                if (!fs.existsSync(outputDirForFile)) {
                    fs.mkdirSync(outputDirForFile, { recursive: true });
                    logger.info(`Created directory: ${outputDirForFile}`);
                }

                writeFileSync(outputPath, compiled);
                logger.success(`Compiled ${path.basename(file)} to ${path.relative(baseOutputDir, outputPath) || path.basename(outputPath)}`);
            } catch (err) {
                if(err instanceof Error) {
                    logger.error(`Failed to process or compile ${file}: ${err.message}`);
                    console.error(`Stacktrace: ${err.stack}`);
                    exit(1);
                } else {
                    logger.error(err);
                }
            }

            logger.exit(); 
        }
    }

    logger.exit(); 
    logger.exit(); 
    logger.success("Project build completed!");
}
