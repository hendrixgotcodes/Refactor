// #!/usr/bin/env node
import yargs from "yargs";
import path from "path";
import figlet from "figlet";
import gradient from "gradient-string";
import fs from "fs/promises";
yargs
    .command({
    command: "rename",
    describe: "execute script",
    builder: {
        path: {
            describe: "Directory or file path",
            demandOption: true,
            type: "string",
        },
        file: {
            describe: "Boolean to indicate if you are refactoring file(s). By default this is true.",
            type: "boolean",
        },
        directory: {
            describe: "Boolean to indicate if you are refactoring directory(s). By default this is false.",
            type: "boolean",
        },
        extension: {
            describe: "If file path is specified",
        },
    },
    handler: (arg) => {
        if (path.isAbsolute(arg.path)) {
            console.log(true);
        }
        else {
            const oldFilePath = path.resolve(arg.path);
            const splitted = oldFilePath.split(".");
            console.log(splitted[splitted.length - 1]);
            let newFilePath = "";
            for (let i = 0; i < splitted.length - 1; i++) {
                newFilePath = splitted[i];
            }
            newFilePath += "." + arg.extension;
            fs.rename(oldFilePath, newFilePath);
        }
    },
})
    .conflicts("file", "directory")
    .parse();
//Executed on
function printInfo() {
    figlet.text("REFACTOR", function (err, data) {
        if (!err) {
            console.log(gradient.pastel.multiline(data));
            console.log("_____________________________________________________________________________\n\n" +
                "A CLI tool built to make developers more agile in refactoring large codebase.\n" +
                "Refactor is in it's early stages, contributions and suggestions are warmly welcome. Please reach out to me via Twitter.\n" +
                "_____________________________________________________________________________\n\n" +
                "Version: 0.0.1\n" +
                "Author: Samuel O. Asare.\n\n");
        }
    });
}
function parseResult(res) {
    const relativePath = new RegExp("^(?!-)[a-z0-9-]+(?<!-)(/(?!-)[a-z0-9-]+(?<!-))*$");
    if (res.includes(".")) {
        console.log(path.dirname(path.resolve(".")));
    }
}
function _(arg0, arg1, _, arg3) {
    throw new Error("Function not implemented.");
}
