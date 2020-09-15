const chalk = require("chalk");

const color = "FF7777";
const lightColor = "FFBBBB";
const ligntChalk = chalk.hex(lightColor);

module.exports = {
  color: color,
  lightColor: lightColor,
  chalk: chalk.hex(color),
  ligntChalk: ligntChalk,
  point: {
    interval: 125,
    frames: [
      ligntChalk.bold("∙∙∙"),
      ligntChalk.bold("●∙∙"),
      ligntChalk.bold("∙●∙"),
      ligntChalk.bold("∙∙●"),
      ligntChalk.bold("∙∙∙"),
    ],
  },
};
