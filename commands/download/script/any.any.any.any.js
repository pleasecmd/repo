const fetch = require("node-fetch");
const minimist = require("minimist");
const { writeFileSync } = require("fs");
const { basename } = require("fs");

module.exports.run = async (argv) => {
  const args = minimist(argv);
  if (args._.length > 1) {
    console.error("Only one url can be downloaded at a time");
    process.exit(1);
  }
  const [url] = args._;
  const download = await fetch(url);
  const buffer = await download.buffer();
  const output = args.o || basename(url.replace(/.*?:\/\//, ""));
  writeFileSync(output, buffer);
};
