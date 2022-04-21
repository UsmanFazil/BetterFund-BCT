// SPDX-FileCopyrightText: 2021 Toucan Labs
//
// SPDX-License-Identifier: MIT

// If you encounter a vulnerability or an issue, please contact <security@toucan.earth> or visit security.toucan.earth
pragma solidity ^0.8.0;

interface IToucanOffset {
    
     function retireAndMintCertificate(
        address beneficiary,
        string calldata beneficiaryString,
        string calldata retirementMessage,
        uint256 amount
    ) external ;

    function approve(address spender, uint256 amount) external returns (bool);
}

