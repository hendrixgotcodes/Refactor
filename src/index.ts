// #!/usr/bin/env node

import yargs from "yargs";
import renameCommand from "./commands/rename";
import aboutCommand from "./commands/about";

yargs
  .command(renameCommand)
  .command(aboutCommand)
  .conflicts("files", "directory")
  .version("1.0.0")
  .parse();
