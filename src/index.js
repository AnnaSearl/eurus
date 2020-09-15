const cli = require("yargs");
const create = require("./create");
const build = require("./build");
const macros = require("./utils/macros");

module.exports.run = async function (args) {
  cli
    .scriptName("eurus")
    .usage(
      `$0 <${macros.placeholder}> [options]`,
      "Create Eurus project",
      (yargs) => {
        return yargs.positional(macros.placeholder, {
          describe: "项目目录",
          type: "string",
        });
      },
      (argv) => {
        create(argv);
      }
    )
    .command(
      ["run <env>"],
      "Compile project",
      () => {},
      (argv) => {
        build(argv);
      }
    )
    .option("t", {
      describe: "目标平台，如 wechat，ali",
      alias: "target",
      type: "string",
      requiresArg: true,
    })
    .option("w", {
      describe: "监听文件变化",
      alias: "watch",
      type: "boolean",
      default: false,
    })
    .option("h", {
      alias: "help",
    })
    .option("v", {
      alias: "version",
    })
    .parse(args);
};
