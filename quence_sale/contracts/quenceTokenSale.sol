pragma solidity ^0.4.2;

import "./quenceToken.sol";

contract quenceTokenSale{

	address admin;
	quenceToken public tokenContract;

	function quenceTokenSale(quenceToken _tokenContract) public {
			admin = msg.sender;
			tokenContract = _tokenContract;
	}

}