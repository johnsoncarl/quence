pragma solidity ^0.4.2;

contract quenceToken{
	// creating constructor
	uint256 public totalSupply;

	// mapping balaceOf
	mapping(address => uint256) public balanceOf;

	function quenceToken (uint256 _initialSupply) public{
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;	//	by ERC20 standards
	}
}