const Memory = artifacts.require("memory");

module.exports = function(deployer) {
  deployer.deploy(Memory);
};
