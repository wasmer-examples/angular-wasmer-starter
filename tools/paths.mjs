import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(dirname, "..");
export const client = path.resolve(root, "dist/browser");
export const ssr = path.resolve(root, "dist/server");
export const winterjs = path.resolve(root, "dist/winterjs");
export const worker = path.resolve(winterjs, "_worker.js");
