import { CommandBuilder } from "yargs";

const builder: CommandBuilder<{}, unknown> = {
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
};

export default builder;
