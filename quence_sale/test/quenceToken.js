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

				// returning the allowance value in next then 
				return tokenInstance.allowance(accounts[0], accounts[1]);
			
			}).then(function(allowance){
				assert.equal(allowance, 100, "for storing the allowance of the delegated transfer");
			
			});
		});

		// transferFrom test 

		it('Handles the delegated transfer', function(){
			return quenceToken.deployed().then(function(instance){
				tokenInstance = instance;
				fromAccount = accounts[2];
				toAccount = accounts[3];
				spendingAccount = accounts[4];

				// transfering some amount to fromAccount
				return tokenInstance.transfer(fromAccount, 100, {from : accounts[0]});

			}).then(function(receipt){
				  return tokenInstance.approve(spendingAccount, 10, {from : fromAccount});

			}).then(function(receipt){
				return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from : spendingAccount});
			
			}).then(assert.fail).catch(function(error){
				assert(error.message.indexOf('revert') >= 0, 'cannot transfer the values larger than the balance');
				// trying to spend amount larger than the approved amount
				return tokenInstance.transferFrom(fromAccount, toAccount, 20, { from : spendingAccount});
			
			}).then(assert.fail).catch(function(error){
				assert(error.message.indexOf('revert' ) >= 0 , ' cannot transfer amount larger than the allowed amount');
				return tokenInstance.transferFrom.call(fromAccount, toAccount, 5, { from : spendingAccount});
			
			}).then(function(success){
				assert.equal(success, true);
				return tokenInstance.transferFrom(fromAccount, toAccount, 5, { from : spendingAccount});
			}).then(function(receipt){
				assert.equal(receipt.logs.length, 1, 'Triggering only one event');
				assert.equal(receipt.logs[0].event, 'Transfer', "the triggered event is the Approval one");
				assert.equal(receipt.logs[0].args._from , fromAccount, ' the _from account is correct');
				assert.equal(receipt.logs[0].args._to , toAccount, ' the _to account is corrct ');
				assert.equal(receipt.logs[0].args._value , 5, ' The allowed aomunt to the spender is correct in this case 5	');

				return tokenInstance.balanceOf(fromAccount);
			}).then(function(balance){
				assert.equal(balance.toNumber(), 95, 'debits 5 tokens(in this case) from the sending account ');
				return tokenInstance.balanceOf(toAccount);

			}).then(function(balance){
				assert.equal(balance.toNumber(), 5, 'credits 5 tokens(in this case) into the receiver account ');
				return tokenInstance.allowance(fromAccount, spendingAccount);
			}).then(function(allowance){
				assert.equal(allowance.toNumber(), 5 , "the updated allownace becomes 5(in this case)")
			});
		});


	}) // contract function closing bracket 