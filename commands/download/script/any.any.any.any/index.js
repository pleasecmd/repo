const { createWriteStream, statSync, existsSync } = require("fs");
const { basename } = require("path");

const fetch = require("node-fetch");
const minimist = require("minimist");
const cliProgress = require("cli-progress");
const prettyBytes = require("pretty-bytes");

const newBar = (path, total) => {
  const name = basename(path);
  const prettyTotal = prettyBytes(total);
  const config = {
    format: `${name} {bar} {prettySize}/${prettyTotal} ⇣ {speed}`,
  };
  const bar = new cliProgress.SingleBar(
    config,
    cliProgress.Presets.shades_grey
  );

  bar.start(total, 0, {
    speed: "N/A",
    prettySize: "0",
  });

  return bar;
};

const progress = (path, total, state, bar = newBar(path, total), prev = 0) => {
  if (state.done) {
    bar.update(total);
    return bar.stop();
  }

  const size = existsSync(path) ? statSync(path).size : 0;

  if (size) {
    bar.update(size, {
      speed: prettyBytes((size - prev) * 10) + "/s",
      prettySize: prettyBytes(size).split(" ").shift(),
    });
  }

  setTimeout(progress, 100, path, total, state, bar, size);
};

const run = async (argv, config) => {
  const args = minimist(argv);
  if (args._.length > 1) {
    console.error("Only one url can be downloaded at a time");
    process.exit(1);
  }
  const [url] = args._;
  const res = await fetch(url);
  const header = res.headers.get("Content-Length");
  const length = parseInt(header);
  const stream = res.body;
  const dest = args.o || basename(url.replace(/.*?:\/\//, ""));
  const output = createWriteStream(dest);
  const state = { done: false };
  if (!config.silentRun) progress(dest, length, state);
  stream.pipe(output);
  stream.on("close", () => {
    state.done = true;
  });
};

module.exports.run = run;
