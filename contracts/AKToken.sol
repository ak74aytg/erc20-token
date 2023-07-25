
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AKToken is ERC20, Ownable {

    constructor() ERC20("AKToken", "ATG") {
        //_mint is used to create new tokens
        _mint(msg.sender, 1000000*(10**uint256(decimals())));
    }

    function mint(address account, uint256 amount) public onlyOwner returns(bool){
        require(account != address(0) && amount!=uint(0), "ATG: function mint invalid input");
        _mint(account, amount);
        return true;
    }

    function burn(address account, uint amount) public onlyOwner returns(bool){
        require(account!=address(0) && amount!=uint(0), "ATG: function burn  invalid input");
        _burn(account, amount);
        return true;
    }

    function buy() public payable returns(bool){
        require(msg.sender.balance>=msg.value && msg.value != 0 ether, "ATG: function buy has invalid input");
        uint amount = msg.value*1000;
        _transfer(owner(), _msgSender(), amount);
        //
        return true;
    }

    function withdraw(uint256 amount) public onlyOwner returns(bool){
        require(amount<=address(this).balance, "ATG: function withdraw has invalid input");
        payable(_msgSender()).transfer(amount);
        //payable(address) : payable makes any function eligible for recieving funds
        //here msgSender will recieve all the money present in smart contract
        return true;
    }






}