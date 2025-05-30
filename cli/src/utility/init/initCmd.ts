import { HOME_CUM_FILE, PACKAGE_JSON } from "./constants";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

export default async function initializeProject(folder: string) {
  const customPackageJson = PACKAGE_JSON.replace("!NAME", "awesome-project");

  if(existsSync(folder)) {
    process.chdir(folder);
  } else {
    mkdirSync(folder);
    process.chdir(folder);
  }

  mkdirSync("app");
  writeFileSync("app/home.cum", HOME_CUM_FILE);
  writeFileSync("package.json", customPackageJson);
  execSync("npm install");

  process.exit(0)
}
