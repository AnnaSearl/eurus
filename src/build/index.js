const chalk = require("chalk");
const shell = require("shelljs");

module.exports = function build(argv) {
  const projectDirectory = "eurus";
  let env = argv.env;
  let api = {};
  if (env === "dev") {
    env = "development";
    api = require(`${process.cwd()}/${projectDirectory}/development.js`);
  }
  if (env === "release") {
    env = "release";
    api = require(`${process.cwd()}/${projectDirectory}/release.js`);
  }
  if (env === "prod") {
    env = "production";
    api = require(`${process.cwd()}/${projectDirectory}/production.js`);
  }
  const variables = Object.keys(api).reduce((prev, curr) => {
    return `${prev} REMAX_APP_${curr.toUpperCase()}=${api[curr]}`;
  }, "");
  const cmd = `cross-env NODE_ENV=${env}${variables} remax build -t ${argv.t} ${
    argv.w ? "-w" : ""
  } ${argv.m ? "-m" : ""}`;

  console.log(chalk.green.bold("\t\n 开始构建"));
  console.log(chalk.green.bold(`\t\n 开启 Remax 进程`));

  const child = shell.exec(cmd, { async: true });

  child.stdout.on("data", function (data) {
    if (data.includes("Compiling")) {
      console.log(
        chalk.green.bold(`\t\n 编译中，目标平台为 ${argv.t}，请稍候... \t\n`)
      );
    }
    if (data.includes("Watching")) {
      console.log(chalk.green.bold(`\t\n 构建完毕，正在监听文件修改...`));
    }
  });
};
