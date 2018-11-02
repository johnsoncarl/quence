pragma solidity ^0.4.2;

import "./quenceToken.sol";

contract quenceTokenSale{

	address admin;
	quenceToken public tokenContract;
	uint256 public tokenPrice;
	uint256 public tokensSold;

	function quenceTokenSale(quenceToken _tokenContract, uint256 _tokenPrice) public {
			admin = msg.sender;
			tokenContract = _tokenContract;
			tokenPrice = _tokenPrice;


	}


	function buyTokens( uint256 _numberOfTokens) public payable{

		// require value equal to tokens
		
		// require enough no of tokens
		
		// keep track of tokens sold
		
		// trigger SELL event
		tokensSold += _numberOfTokens;
		
		// require transfer successful
	}

}