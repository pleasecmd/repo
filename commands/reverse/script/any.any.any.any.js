module.exports.run = (argv) => {
  if (argv.length) {
    return console.log(argv.join(" ").split("").reverse().join(""));
  }
  const chunks = [];
  process.stdin.on("data", (chunk) => chunks.push(chunk.toString()));
  process.stdin.on("close", () => {
    console.log(chunks.join("").slice(0, -1).split("").reverse().join(""));
    chunks.length = 0;
  });
};
