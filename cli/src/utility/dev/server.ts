import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { OUT_DIR } from "../constants";

const PORT = process.env.PORT || 6969;
const DEV_MODE: boolean = process.env.NODE_ENV !== "production";

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "text/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

let PUBLIC_PATH: string;
let OUT_DIR_ADJUSTED: string;

if(DEV_MODE) {
    PUBLIC_PATH = path.join(process.cwd(), `testInit/${OUT_DIR}/`);
    OUT_DIR_ADJUSTED = 'testInit/' + OUT_DIR;
} else {
    PUBLIC_PATH = path.join(process.cwd(), OUT_DIR);
    OUT_DIR_ADJUSTED = OUT_DIR;
}

const toBool = [() => true, () => false];

const prepareFile = async (url: string) => {
  const paths = [PUBLIC_PATH, url];
  if (url.endsWith("/")) paths.push('./index.html');

  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(PUBLIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : PUBLIC_PATH + "/.internal" + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);

  return { found, ext, stream };
};

export default function beginServer() {
    console.log(`Zyxi: zyro dev server running at http://127.0.0.1:${PORT}/`);

    http
      .createServer(async (req, res) => {
        const file = await prepareFile(req.url);
        const statusCode = file.found ? 200 : 404;
        const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
        res.writeHead(statusCode, { "Content-Type": mimeType });
        file.stream.pipe(res);
        console.log(`${req.method} ${req.url} ${statusCode}`);
      })
      .listen(PORT);
    process.on('SIGINT', () => process.exit());
}
