const fetch = require("node-fetch");
const minimist = require("minimist");
const { writeFileSync } = require("fs");

module.exports.run = async (argv) => {
  const args = minimist(argv);
  if (args._.length > 0) {
    console.error("Only one url can be downloaded at a time");
    process.exit(1);
  }
  const [url] = args._;
  const download = await fetch(url);
  const buffer = await download.buffer();
  if (args.o) {
    writeFileSync(args.o, buffer);
  } else {
    process.stdout.write(buffer);
  }
};
