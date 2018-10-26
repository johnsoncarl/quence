pragma solidity ^0.4.2;

contract quenceToken{
	// creating constructor
	uint256 public totalSupply;

	function quenceToken () public{
		totalSupply = 1000000;	//	by ERC20 standards
	}
}