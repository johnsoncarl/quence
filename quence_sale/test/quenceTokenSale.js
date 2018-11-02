var quenceTokenSale = artifacts.require("./quenceTokenSale.sol");


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
		});
	});
})