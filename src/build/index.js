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
  }`;
  shell.exec(cmd);
};
