import * as figlet from "figlet";
import * as gradient from "gradient-string";
import { CommandModule } from "yargs";

function printInfo() {
  figlet.text("REFACTOR", (err, data) => {
    if (!err) {
      console.log(gradient.pastel.multiline(data!));
      console.log(
        "_____________________________________________________________________________\n\n" +
          "A CLI tool built to make developers more agile in refactoring large codebase.\n" +
          "Refactor is in it's early stages, contributions and suggestions are warmly welcome. Please reach out to me via Twitter.\n" +
          "_____________________________________________________________________________\n\n" +
          "Version: 0.1.0\n" +
          "Author: Samuel O. Asare.\n\n",
      );
    }
  });
}

const aboutCommand: CommandModule<{}, unknown> = {
  command: "about",
  describe: "Print about",
  builder: {},
  handler: printInfo,
};

export default aboutCommand;
