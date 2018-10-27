pragma solidity ^0.4.2;

contract quenceToken{
	// creating constructor
	uint256 public totalSupply;

	function quenceToken (uint256 _initialSupply) public{
		totalSupply = _initialSupply;	//	by ERC20 standards
	}
}