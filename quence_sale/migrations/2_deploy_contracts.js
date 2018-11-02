var quenceToken = artifacts.require("./quenceToken.sol");
var quenceTokenSale = artifacts.require("./quenceTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(quenceToken, 1000000).then(function(){
  	
  	var tokenPrice = 100000000000000; // the price is in WEI equal to 0.0001 ETH
  	return deployer.deploy(quenceTokenSale, quenceToken.address, tokenPrice);
  }); // this 1000000 passes through the constructor of the quenceToken.sol
};
