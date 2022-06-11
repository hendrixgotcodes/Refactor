import path from "path";
import fs from "fs/promises";

async function renameFileRecursive(arg: any) {
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
    if (!path.isAbsolute(arg.path)) renameFileRecursive(arg);
  }

  //   if (arg.directory) {
  //   }
}
