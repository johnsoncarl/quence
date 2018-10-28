var quenceToken = artifacts.require("./quenceToken.sol")

contract('quenceToken', function(accounts)
	{

		it('initializing the contracts with the initial values', function(){
			return quenceToken.deployed().then(function(instance){
				tokenInstance = instance;
				return tokenInstance.name();
			}).then(function(name){
				assert.equal(name, "Quence Token", "the name is correct");
				return tokenInstance.symbol();
			}).then(function(symbol){
				assert.equal(symbol, "QUT", "the symbol is correct")
			});
		})

		it('to allocate the initial supply when deployed', 
				function()
					{
						return quenceToken.deployed().then(function(instance)
																{
																	tokenInstance = instance;
																	return tokenInstance.totalSupply();
																}

															).then(function(totalSupply)
																	{
																		assert.equal(totalSupply.toNumber(), 1000000, 'It sets the total supply to 1,000,000');
																		return tokenInstance.balanceOf(accounts[0]);
																	}
																).then(function(adminBalance){
																	assert.equal(adminBalance.toNumber(), 1000000, 'This thing does allocation of initial supply to the admin account.');
																}); // latest then() function closing bracket
					} // function inside it ending 

			); // it function closing bracket 


		it('Transfer Token amount', function(){
			return quenceToken.deployed().then(function(instance){
				tokenInstance = instance;
				// testing 'require' statement
				return tokenInstance.transfer.call(accounts[1], 9999999999999999999);

				}).then(assert.fail).catch(function(error) {
						assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
						return tokenInstance.transfer.call(accounts[1], 250000, { from : accounts[0]});
				
				}).then(function(success){
						assert.equal(success, true, "It returns True!")
						return tokenInstance.transfer(accounts[1], 250000, { from : accounts[0]});
				
				}).then(function(receipt){

					assert.equal(receipt.logs.length, 1, 'Triggering only one event');
					assert.equal(receipt.logs[0].event, 'Transfer', "the triggered event is the TRANSFER one");
					assert.equal(receipt.logs[0].args._from , accounts[0], ' the sender is account zero');
					assert.equal(receipt.logs[0].args._to , accounts[1], ' the receiver is account one ');
					assert.equal(receipt.logs[0].args._value , 250000, ' The amount transferred is 250000');

					return tokenInstance.balanceOf(accounts[1]);

				}).then(function(balance){
					assert.equal(balance.toNumber(), 250000, 'adds amount to the receiver side');
					return tokenInstance.balanceOf(accounts[0]);

				}).then(function(balance){
					assert.equal(balance.toNumber(), 750000, 'updates the sender balance');

				});
		});


		it('For delegated transfers', function(){
			return quenceToken.deployed().then(function(instance){
				tokenInstance = instance;
				// a call to transfer function ** not actually transferring coins
				return tokenInstance.approve.call(accounts[1], 100, { from : accounts[0]});
			}).then(function(success){
				assert.equal(success, true, "Approve returns true");
				return tokenInstance.approve(accounts[1],100);
			}).then(function(receipt){
				assert.equal(receipt.logs.length, 1, 'Triggering only one event');
				assert.equal(receipt.logs[0].event, 'Approval', "the triggered event is the Approval one");
				assert.equal(receipt.logs[0].args._owner , accounts[0], ' the _owner of the tokens');
				assert.equal(receipt.logs[0].args._spender , accounts[1], ' the _spender of the tokens ');
				assert.equal(receipt.logs[0].args._value , 100, ' The allowed aomunt to the spender is 100	');

			});
		});


	}) // contract function closing bracket 