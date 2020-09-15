const inquirer = require("inquirer");
const Metalsmith = require("metalsmith");
const chalk = require("chalk");
const ora = require("ora");
const path = require("path");
const fs = require("fs-extra");
const eurus = require("../theme");
const questions = require("../config").questions;
const macros = require("../utils/macros");
const ask = require("./ask");
const renderTemplateFiles = require("./render");

module.exports = async function create(argv) {
  const projectName = argv[macros.placeholder];
  const destinationPath = path.join(process.cwd(), projectName);
  let templatePath = path.join(__dirname, "../..", macros.templatePathName);
  const answers = await inquirer.prompt(questions);
  if (answers.ts) {
    templatePath = path.join(templatePath, "ts");
  } else {
    templatePath = path.join(templatePath, "js");
  }
  console.log("\n");
  const spinner = ora({
    spinner: eurus.point,
    prefixText: eurus.ligntChalk.bold("Eurus"),
    text: eurus.ligntChalk(macros.download),
  });
  spinner.start();
  const isExists = fs.pathExistsSync(destinationPath);
  if (isExists) {
    spinner.stop();
    console.log(chalk.hex("FFFF66").bold("  此项目已存在，请变更名字后重试"));
    return;
  }
  Metalsmith(process.cwd())
    .metadata({
      name: macros.name,
      description: macros.description,
      author: macros.author,
      platform: macros.defaultPlatform,
      one: false,
    })
    .source(templatePath)
    .destination(destinationPath)
    .use(ask(answers))
    .use(renderTemplateFiles())
    .build((err) => {
      if (err) {
        spinner.stop();
        console.log(chalk.hex("FF4D4F").bold("  Project init failed"));
        console.log("error: ", err);
        return;
      }
      console.log("\n");
      spinner.stopAndPersist({
        prefixText: false,
        symbol: eurus.ligntChalk.bold("✔"),
        text: eurus.ligntChalk("Project init successfully!"),
      });
      console.log(
        chalk.cyan("\t\n  1. First, please execute the following command:")
      );
      console.log(
        eurus.chalk.bold("\t\n    cd " + projectName + " && npm install")
      );
      console.log(
        chalk.cyan("\t\n  2. Then you can run several commands:\t\n")
      );
      console.log(eurus.chalk.bold("    npm start"));
      console.log("      Run development environment.");
      console.log(eurus.chalk.bold("\t\n    npm run build"));
      console.log("      Building applications for production.");
    });
};
