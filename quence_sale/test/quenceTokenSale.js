var quenceTokenSale = artifacts.require("./quenceTokenSale.sol");
var tokenPrice = 100000000000000; // the price is in WEI equal to 0.0001 ETH

contract('quenceTokenSale', function(accounts){

	var tokenSaleInstance;

	it('To initialize the TokenSale contract with the correct values', function(){

		return quenceTokenSale.deployed().then(function(instance){

			tokenSaleInstance = instance;
			return tokenSaleInstance.address;
		
		}).then(function(address){
			assert.notEqual(address, 0x0, 'has some contract address');
			return tokenSaleInstance.tokenContract();

		}).then(function(address){
			assert.notEqual(address, 0x0, 'has some token Contract');
			return tokenSaleInstance.tokenPrice();
		}).then(function(price){
			assert.equal(price, tokenPrice, 'the token price is correct');
		});
	});

	it('facilitates the token Buying', function(){
		return quenceTokenSale.deployed().then(function(instance){
			tokenSaleInstance = instance;
			var numberOfTokens = 10;
			var value = numberOfTokens*tokenPrice;

			return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer , value : value})			
		}).then(function(receipt){
			return tokenSaleInstance.tokensSold();
		}).then(function(amount){
			assert.equal(amount.toNumber(), numberOfTokens, 'increments the no of tokens sold')
		})
	})
})