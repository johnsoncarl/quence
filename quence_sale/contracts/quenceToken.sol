pragma solidity ^0.4.2;

contract quenceToken{
	// creating constructor
	
	// name and token id
	string public name = "Quence Token";
	string public symbol = "QUT";

	uint256 public totalSupply;

	// mapping balaceOf
	mapping(address => uint256) public balanceOf;

	function quenceToken (uint256 _initialSupply) public{
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;	//	by ERC20 standards
	}


	// we need to add the transfer function as follows
	function transfer(address _to, uint256 _value) public returns (bool success){
		// the function has to have following
		// exceptions should be raised if the account doesn't have the _value
		require(balanceOf[msg.sender] >= _value;)
		// transfer event shuld be fired
		// boolean shuould be returned
	}
}