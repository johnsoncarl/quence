var quenceToken = artifacts.require("./quenceToken.sol");

module.exports = function(deployer) {
  deployer.deploy(quenceToken);
};
