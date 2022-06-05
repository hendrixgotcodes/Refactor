import path from "path";
import fs from "fs/promises";
import { CommandModule } from "yargs";

// interface iRenameCommandType{
//   path: CommandBuilder<{}, unknown>,
//   file: CommandBuilder<{}, unknown>,
//   directory: CommandBuilder<{}, unknown>,
//   fromExt: CommandBuilder<{}, unknown>,
//   toExt: CommandBuilder<{}, unknown>,
// }

const renameCommand: CommandModule<{}, unknown> = {
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
      describe:
        "Meant to abbreviate FromExtension. This option takes the file extensions the user intends to change.",
      alias: "frEx",
      type: "string",
    },
    toExt: {
      describe:
        "Meant to abbreviate ToExtension. This option takes the extension form the user desires to give the file(s) under operation.",
      alias: "toEx",
      type: "string",
    },
  },
  handler: (arg: any) => {
    if (
      (arg.file && !arg.fromExt && !arg.toExt) ||
      (arg.file && arg.fromExt && !arg.toExt) ||
      (arg.file && !arg.fromExt && arg.toExt)
    )
      return console.log(
        "The '--file' argument is dependent on both '--fromExt' and '--toExt' arguments."
      );

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
};

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

      if (splitted[splitted.length - 1] === initialExtension) {
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

    for (let i = 0; i <= newFileNames.length - 1; i++) {
      await fs.rename(oldFileNames[i], newFileNames[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

export default renameCommand;
