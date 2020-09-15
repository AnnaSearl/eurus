const consolidate = require("consolidate");
const async = require("async");

module.exports = function renderTemplateFiles() {
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
};
