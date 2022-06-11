import * as path from "path";
import * as fs from "fs/promises";
import * as inquirer from "inquirer";
import { createSpinner } from "nanospinner";

async function renameFiles(arg: any) {
  const folderPath: string = path.resolve(arg.path);
  const finalExtension: string = arg.toExt;
  const initialExtension: string = arg.fromExt;
  const newFileNames: string[] = [];
  const oldFileNames: string[] = [];

  try {
    const existingFiles = await fs.readdir(folderPath);

    existingFiles.forEach((file) => {
      const splitted = file.split(".");

      if (splitted[splitted.length - 1] === initialExtension) {
        const oldFileName = `${folderPath}\\${file}`;
        let newFileName = "";

        for (let i = 0; i < splitted.length - 1; i += 1) {
          newFileName += splitted[i];
        }

        newFileName = `${folderPath}\\${newFileName}.${finalExtension}`;
        newFileNames.push(newFileName);
        oldFileNames.push(oldFileName);
      }

      // await fs.rename(oldFileName, newFileName)
    });

    const operations: Promise<any>[] = [];

    for (let i = 0; i <= newFileNames.length - 1; i += 1) {
      operations.push(fs.rename(oldFileNames[i], newFileNames[i]));
    }

    await Promise.all(operations);
  } catch (error) {
    console.log(error);
  }
}

interface IPromptMessage {
  name: string;
  message: string;
}

async function renameFolder(args: any) {
  try {
    const folderPath = path.resolve(args.path);
    const promptMessages: IPromptMessage[] = [];

    const res = await fs.readdir(folderPath, {
      withFileTypes: true,
    });

    res.forEach((file) => {
      if (file.isDirectory()) {
        promptMessages.push({
          name: file.name,
          message: `rename ${file.name}`,
        });
      }
    });

    const answers: { [key: string]: string } = await inquirer.prompt(
      // eslint-disable-next-line
      promptMessages
    );

    const operations: Promise<any>[] = [];

    /* eslint-disable @typescript-eslint/comma-dangle */
    promptMessages.forEach((prompt) => {
      operations.push(
        fs.rename(
          path.resolve(args.path, prompt.name),
          path.resolve(args.path, answers[prompt.name])
        )
      );
    });

    const spinner = createSpinner("refactoring");
    spinner.start();

    await Promise.all(operations);
    spinner.success({ text: "done" });
  } catch (error) {
    console.log(error);
  }
}

export default function handler(arg: any) {
  if (arg.file) {
    if (
      (!arg.fromExt && !arg.toExt) ||
      (arg.fromExt && !arg.toExt) ||
      (!arg.fromExt && arg.toExt)
    ) {
      console.log(
        // eslint-disable-next-line @typescript-eslint/comma-dangle
        "The '--file' argument is dependent on both '--fromExt' and '--toExt' arguments."
      );
      return;
    }
    if (!path.isAbsolute(arg.path)) renameFiles(arg);
  } else if (arg.directory) {
    renameFolder(arg);
  }

  //   if (arg.directory) {
  //   }
}
