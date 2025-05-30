import fs from "node:fs";
import path from "node:path";

function readFindFilesInDir(dir: string, extension: string) {
    const files = fs.readdirSync(dir);
    let foundFiles: string[] = [];

    files.forEach(file => {
        const filePath = path.join(dir, file);

        if(fs.statSync(filePath).isDirectory()) {
            readFindFilesInDir(filePath, extension);
        } else if (filePath.endsWith(extension)) {
            foundFiles.push(filePath);
        }
    });

    return foundFiles;
}

export {
    readFindFilesInDir,
};
