const { execSync } = require("child_process");
const ubuntu = require("@please.dev/lib/os/managers/ubuntu");

const prerequisites = [
  "apt-transport-https",
  "ca-certificates",
  "curl",
  "gnupg",
  "lsb-release",
];

const docker = ["docker-ce", "docker-ce-cli", "containerd.io"];

const gpg = `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`;
const addRepo = `echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`;

module.exports.install = (config) => {
  ubuntu.repo.update([], config);
  ubuntu.install(prerequisites, [], config);
  const stdio = config.silentInstall ? "ignore" : "pipe";
  execSync(gpg, { stdio, shell: true });
  execSync(addRepo, { stdio, shell: true });
  ubuntu.repo.update([], config);
  ubuntu.install(docker, [], config);
};
