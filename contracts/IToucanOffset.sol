// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IToucanOffset {
    function retireAndMintCertificate(
        string calldata retiringEntityString,
        address beneficiary,
        string calldata beneficiaryString,
        string calldata retirementMessage,
        uint256 amount
    ) external;
}