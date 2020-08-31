const cli = require("yargs");
const inquirer = require("inquirer");
const Metalsmith = require("metalsmith");
const consolidate = require("consolidate");
const chalk = require("chalk");
const ora = require("ora");
const path = require("path");
const fs = require("fs-extra");
const async = require("async");

const lingColor = "FF7777";
const lingLightColor = "FFBBBB";
const lingChalk = chalk.hex(lingColor);
const lingLigntChalk = chalk.hex(lingLightColor);
const lingPoint = {
  interval: 125,
  frames: [
    lingLigntChalk.bold("∙∙∙"),
    lingLigntChalk.bold("●∙∙"),
    lingLigntChalk.bold("∙●∙"),
    lingLigntChalk.bold("∙∙●"),
    lingLigntChalk.bold("∙∙∙"),
  ],
};

const questions = [
  {
    type: "list",
    name: "platform",
    message: "您要创建哪种平台的小程序？",
    choices: [
      { name: "wechat", value: "wechat" },
      { name: "ali", value: "ali" },
      { name: "toutiao", value: "toutiao" },
      { name: "one", value: "one" },
    ],
    default: "wechat",
  },
  {
    type: "list",
    name: "ts",
    message: "您的项目使用TypeScript吗？",
    choices: [
      { name: "Yes", value: true },
      { name: "NO", value: false },
    ],
    default: "Yes",
  },
  {
    type: "list",
    name: "anna",
    message: "您想使用 Anna 作为UI组件么？",
    choices: [
      { name: "Yes", value: true },
      { name: "NO", value: false },
    ],
    default: "Yes",
  },
];

function ask(prompts) {
  return function (_, metalsmith, done) {
    const metadata = metalsmith.metadata();
    async.eachSeries(Object.keys(prompts), run, done);
    if (metadata["platform"] === "one") {
      metadata["one"] = true;
    }

    function run(key, done) {
      metadata[key] = prompts[key];
      done();
    }
  };
}

function renderTemplateFiles() {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    const keys = Object.keys(files);
    async.each(
      keys,
      (file, next) => {
        const str = files[file].contents.toString();
        if (!/{{([^{}]+)}}/g.test(str)) {
          return next();
        }
        consolidate.handlebars.render(str, metadata, (err, res) => {
          if (err) {
            err.message = `[${file}] ${err.message}`;
            return next(err);
          }
          files[file].contents = Buffer.from(res, "utf-8");
        });
        next();
      },
      done
    );
  };
}

module.exports.run = async function (args) {
  cli.parse(args);
  const projectName = cli.argv._[0];
  const destinationPath = path.join(process.cwd(), projectName);
  let templatePath = path.join(__dirname, "..", "template");
  const answers = await inquirer.prompt(questions);
  if (answers.ts) {
    templatePath = path.join(templatePath, "ts");
  } else {
    templatePath = path.join(templatePath, "js");
  }
  console.log("\n");
  const spinner = ora({
    spinner: lingPoint,
    prefixText: lingLigntChalk.bold("Ling"),
    text: lingLigntChalk("Downloading template, please wait..."),
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
      name: "ling-project",
      description: "ling-project",
      author: "ling",
      platform: "wechat",
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
        symbol: lingLigntChalk.bold("✔"),
        text: lingLigntChalk("Project init successfully!"),
      });
      console.log(
        chalk.cyan("\t\n  1. First, please execute the following command:")
      );
      console.log(
        lingChalk.bold("\t\n    cd " + projectName + " && npm install")
      );
      console.log(
        chalk.cyan("\t\n  2. Then you can run several commands:\t\n")
      );
      console.log(lingChalk.bold("    npm start"));
      console.log("      Run development environment.");
      console.log(lingChalk.bold("\t\n    npm run build"));
      console.log("      Building applications for production.");
    });
};

// 更改名称
