pragma solidity ^0.4.2;

contract quenceToken{
	// creating constructor
	
	// name and token id
	string public name = "Quence Token";
	string public symbol = "QUT";

	uint256 public totalSupply;

	// declaring transfer event (documentation of ERC20 for the reference of the arguments required
	event Transfer (

		address indexed _from,
		address indexed _to,
		uint256 _value);

	// Approval event
	event Approval(
			address indexed _owner,
			address indexed _spender,
			uint256 _value);

	// mapping balaceOf
	mapping(address => uint256) public balanceOf;
	mapping(address => mapping(address => uint256)) public allowance;

	constructor (uint256 _initialSupply) public{
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;	//	by ERC20 standards
	}


	// we need to add the transfer function as follows
	function transfer(address _to, uint256 _value) public returns (bool success){
		// the function has to have following
		// exceptions should be raised if the account doesn't have the _value
		require(balanceOf[msg.sender] >= _value);
		
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value; 

		// firing event Transfer
		emit Transfer(msg.sender, _to, _value);
		
		// boolean should be returned
		return true;
	}

	// approve function

	function approve(address _spender, uint256 _value) public returns (bool success){
		
		// allowance test case
		allowance[msg.sender][_spender] = _value;

		// firing Approval event
		emit Approval(msg.sender, _spender, _value);


		return true;

	}

	


	// transferFrom
	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){

		// require _from has enough balanceOf
		require(balanceOf[_from] >= _value);
		
		// allowance is big enough
		require(allowance[_from][msg.sender] >= _value);

		// change balance
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		
		// update allowance
		allowance[_from][msg.sender] -= _value;
		
		// transfer event
		emit Transfer(_from, _to, _value);
		
		// return booleaj n j
		return true;
	}

}