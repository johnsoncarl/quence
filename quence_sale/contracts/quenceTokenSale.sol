pragma solidity ^0.4.2;

import "./quenceToken.sol";

contract quenceTokenSale{

	address admin;
	quenceToken public tokenContract;
	uint256 public tokenPrice;


	function quenceTokenSale(quenceToken _tokenContract, uint256 _tokenPrice) public {
			admin = msg.sender;
			tokenContract = _tokenContract;
			tokenPrice = _tokenPrice;


	}

}