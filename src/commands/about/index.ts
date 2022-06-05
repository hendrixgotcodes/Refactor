import figlet from "figlet";
import gradient from "gradient-string";
import { CommandModule } from "yargs";


const aboutCommand:CommandModule<{}, unknown> = {
    command: "about",
    describe: "Print about",
    builder: {},
    handler: printInfo
}

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

export default aboutCommand