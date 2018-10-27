var quenceToken = artifacts.require("./quenceToken.sol")

contract('quenceToken', function(accounts)
	{
		it('to set the total supply when deployed', 
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
																	}
																); // latest then() function closing bracket
					} // function inside it ending 

			); // it function closing bracket 
	}) // contract function closing bracket 