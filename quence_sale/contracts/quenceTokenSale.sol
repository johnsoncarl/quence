pragma solidity ^0.4.2;

import "./quenceToken.sol";

contract quenceTokenSale{

	address admin;
	quenceToken public tokenContract;
	uint256 public tokenPrice;
	uint256 public tokensSold;

	event Sell(address _buyer, uint256 _amount);

	function quenceTokenSale(quenceToken _tokenContract, uint256 _tokenPrice) public {
			admin = msg.sender;
			tokenContract = _tokenContract;
			tokenPrice = _tokenPrice;


	}


	function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

	function buyTokens( uint256 _numberOfTokens) public payable{

		// require value equal to tokens
		require( msg.value == mul(_numberOfTokens, tokenPrice));

		// require the contract has enough no of tokens
		require( tokenContract.balanceOf(this) >= _numberOfTokens);
		// keep track of tokens sold
		
		// trigger SELL event
		tokensSold += _numberOfTokens;

		Sell(msg.sender, _numberOfTokens);
		
		// require transfer successful
		require(tokenContract.transfer(msg.sender, _numberOfTokens));
	}

}


// Next is to setup up sale tokens
