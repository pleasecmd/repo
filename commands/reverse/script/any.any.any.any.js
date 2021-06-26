module.exports.run = (argv) => {
  return argv.join(" ").split("").reverse().join("");
};
