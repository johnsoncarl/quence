var quenceToken = artifacts.require("./quenceToken.sol");
var quenceTokenSale = artifacts.require("./quenceTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(quenceToken, 1000000).then(function(){
  	return deployer.deploy(quenceTokenSale, quenceToken.address);
  }); // this 1000000 passes through the constructor of the quenceToken.sol
};
