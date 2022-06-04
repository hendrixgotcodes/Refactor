// #!/usr/bin/env node

import yargs, { Arguments } from "yargs";
import path from "path";
import figlet from "figlet";
import gradient from "gradient-string";
import fs from "fs/promises";

interface IRenameArguments {
  path: string;
  file: boolean;
  directory: boolean;
  extension: string;
}

yargs
  .command({
    command: "rename",
    describe: "execute script",
    builder: {
      path: {
        describe: "Directory or file path",
        demandOption: true,
        type: "string",
        alias: "p",
      },
      file: {
        describe:
          "Boolean to indicate if you are refactoring file(s). By default this is true.",
        type: "boolean",
        alias: "f",
      },
      directory: {
        describe:
          "Boolean to indicate if you are refactoring directory(s). By default this is false.",
        type: "boolean",
        alias: "dir",
      },
      fromExt: {
        describe: "Meant to abbreviate FromExtension. This option takes the file extensions the user intends to change.",
        alias: "frEx",
        type: "string"
      },
      toExt: {
        describe: "Meant to abbreviate ToExtension. This option takes the extension form the user desires to give the file(s) under operation.",
        alias: "toEx",
        type: "string"
      },
    },
    handler: (arg: any) => {
      if((arg.file && !arg.fromExt && !arg.toExt) || (arg.file && arg.fromExt && !arg.toExt) ||  (arg.file && !arg.fromExt && arg.toExt)) 
        return console.log("The '--file' argument is dependent on both '--fromExt' and '--toExt' arguments.")

      if (path.isAbsolute(arg.path)) {
        console.log(true);
      } else {
        // renameFile(arg);
        // fs.readdir(arg.path).then((res) => {
        //   console.log(res);
        // });

        renameFileRecursive(arg);
      }
    },
  })
  .command({
    command: "about",
    describe: "print about",
    builder: {},
    handler: printInfo,
  })
  .conflicts("file", "directory")
  .version("0.0.1")
  .alias("v", "version")
  .parse();

//Executed on
function printInfo() {
  figlet.text("REFACTOR", function (err, data) {
    if (!err) {
      console.log(gradient.pastel.multiline(data!));
      console.log(
        "_____________________________________________________________________________\n\n" +
          "A CLI tool built to make developers more agile in refactoring large codebase.\n" +
          "Refactor is in it's early stages, contributions and suggestions are warmly welcome. Please reach out to me via Twitter.\n" +
          "_____________________________________________________________________________\n\n" +
          "Version: 0.0.1\n" +
          "Author: Samuel O. Asare.\n\n"
      );
    }
  });
}

async function renameFileRecursive(arg: any) {
  const folderPath: string = path.resolve(arg.path);
  const finalExtension: string = arg.toExt;
  const initialExtension: string = arg.fromExt;
  const newFileNames: string[] = [];
  const oldFileNames: string[] = [];

  try {
    const existingFiles = await fs.readdir(folderPath);

    for (const file of existingFiles) {

      const splitted = file.split(".");

      if(splitted[splitted.length-1] === initialExtension){
        const oldFileName = folderPath + "\\" + file;
        let newFileName = "";
  
        for (let i = 0; i < splitted.length - 1; i++) {
          newFileName += splitted[i];
        }
  
        newFileName = folderPath + "\\" + newFileName + "." + finalExtension;
        newFileNames.push(newFileName);
        oldFileNames.push(oldFileName);
      }
      
      
      // await fs.rename(oldFileName, newFileName)
    }


    for(let i=0; i<=newFileNames.length-1; i++){
      await fs.rename(oldFileNames[i], newFileNames[i])
    }

  } catch (error) {
    console.log(error)
  }
}



function renameFile(arg: any) {
  const oldFilePath = path.resolve(arg.path);
  const splitted = oldFilePath.split(".");

  let newFilePath = "";

  for (let i = 0; i < splitted.length - 1; i++) {
    newFilePath = splitted[i];
  }

  newFilePath += "." + arg.toExt;

  fs.rename(oldFilePath, newFilePath);
}

function _(arg0: string, arg1: string, _: any, arg3: (argv: any) => void) {
  throw new Error("Function not implemented.");
}
