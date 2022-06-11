"use strict";
// #!/usr/bin/env node
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const rename_1 = __importDefault(require("./commands/rename"));
const about_1 = __importDefault(require("./commands/about"));
yargs_1.default
    .command(rename_1.default)
    .command(about_1.default)
    .conflicts("files", "directory")
    .version("0.0.1")
    .parse();
