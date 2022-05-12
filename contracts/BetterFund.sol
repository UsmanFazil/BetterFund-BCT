// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol"; //used for getReserves function
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol"; //used for swaps duplicate safemath import here, need to fix.
import "./Ownable.sol";
import "./ReentrancyGuard.sol";
import "./Pausable.sol";
import "./IToucanOffset.sol";
import "./IBCT.sol";
import "./IERC721TokenReceiver.sol";

contract BetterFund is Ownable, ReentrancyGuard, Pausable, ERC721TokenReceiver {
    using SafeMath for uint256;

    IBCT public bctToken;
    address public BCT;

    bool private initDone;
    address constant User = 0xa08a9bA3EaC7EC46FB2e6072A966219cD98D6D69;

    event Received();

    function init(address _bctAddress) public {
        require(!initDone, "init done");
        BCT = _bctAddress;
        bctToken = IBCT(_bctAddress);
        _Ownable_init(msg.sender);
        initDone = true;
    }

    // function to redeem BCT tokens
    // calls retire and mint certificate fuinction to reture received TCO2 tokens.
    function RedeemBCTTRetireTCO2(uint256 amount) public {
        address[] memory tcO2sAddresses;
        uint256[] memory tcO2Amounts;

        (tcO2sAddresses, tcO2Amounts) = bctToken.redeemAuto2(amount);

        for (uint256 i = 0; i < tcO2sAddresses.length; i++) {
            if (tcO2Amounts[i] < 1e15) continue;
            IToucanOffset(tcO2sAddresses[i]).retireAndMintCertificate(
                "user",
                User,
                "test",
                "test",
                tcO2Amounts[i]
            );
        }
    }

    function onERC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes calldata _data
    ) external override returns (bytes4) {
        _operator;
        _from;
        _tokenId;
        _data;
        emit Received();
        return 0x150b7a02;
    }

    function PauseContract() public anyAdmin {
        _pause();
    }

    function UnPauseContract() public anyAdmin {
        _unpause();
    }
}
