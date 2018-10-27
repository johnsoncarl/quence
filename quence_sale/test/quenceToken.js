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
	}) // contract function closing bracket 