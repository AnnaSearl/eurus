const async = require("async");

module.exports = function ask(prompts) {
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
};
