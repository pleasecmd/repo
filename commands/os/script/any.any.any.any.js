const { getOSInfo } = require("@please.dev/lib/os");

module.exports.run = async (_, config) => {
  if (!config.silentRun) {
    const osInfo = await getOSInfo();
    console.log(osInfo);
  }
};
