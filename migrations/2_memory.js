const Memory = artifacts.require("Memory");

module.exports = function(deployer) {
  deployer.deploy(Memory);
};
