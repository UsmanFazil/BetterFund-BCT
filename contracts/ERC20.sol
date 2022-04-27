// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Custom is ERC20 {
    constructor(uint256 initialSupply) ERC20("BCT", "BCT_") {
        _mint(msg.sender, initialSupply);
    }

}