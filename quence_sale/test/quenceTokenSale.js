var quenceToken = artifacts.require("./quenceToken.sol");
var quenceTokenSale = artifacts.require("./quenceTokenSale.sol");


contract('quenceTokenSale', function(accounts){

	var tokenSaleInstance;
	var admin = accounts[0];
	var buyer = accounts[1];
	var tokensAvailable = 750000;
	var numberOfTokens = 10;
	var tokenPrice = 100000000000000; // the price is in WEI equal to 0.0001 ETH


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
		return quenceToken.deployed().then(function(instance){
			// creating  quence token instance
			tokenInstance = instance;

			return quenceTokenSale.deployed();

		}).then(function(instance){
			// creating quence token sale instance
			tokenSaleInstance = instance;

			// transferring 75% of total tokens to token sales contract 
			return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from : admin })
		
		}).then(function(receipt) {
			return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer , value : numberOfTokens*tokenPrice})					
		
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'Triggering only one event');
			assert.equal(receipt.logs[0].event, 'Sell', "the triggered event is the SELL one");
			assert.equal(receipt.logs[0].args._buyer , buyer, ' logs the account that purchase the tokens');
			assert.equal(receipt.logs[0].args._amount , numberOfTokens, ' logs the number of tokens purchased ');

			return tokenSaleInstance.tokensSold();
		
		}).then(function(amount){
			assert.equal(amount.toNumber(), numberOfTokens, 'increments the no of tokens sold');
		
			// trying to buy tokens different from original ether value , to prevent client from underpaying
			return tokenSaleInstance.buyTokens(numberOfTokens , { from : buyer , value : 1 });
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf("revert") >= 0 , 'msg.value must have equal no in wei');
			return tokenSaleInstance.buyTokens(800000, { from : buyer, value : 800000*tokenPrice });		
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf("revert") >= 0 , 'cannot purchase more tokens than available');
		});
	});
});
