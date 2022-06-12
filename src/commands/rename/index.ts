import { CommandModule } from "yargs";
import builder from "./builder";
import handler from "./handler";

const renameCommand: CommandModule<{}, unknown> = {
  command: "rename",
  describe: "execute script",
  builder,
  handler,
};

export default renameCommand;
