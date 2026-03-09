// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ChainSplit is Ownable, ReentrancyGuard {
    uint256 public constant PROTOCOL_FEE_BPS = 200; // Increased to 2%
    uint256 public constant PENALTY_BPS = 500;      // 5% Stalling Penalty
    
    uint256 public accumulatedFees; 
    uint256 public totalEscrows; 

    struct Escrow {
        address creator;
        address platform;
        uint256 creatorLocked;
        uint256 platformLocked;
        uint256 deadline;
        bool platformApproved; 
        bool creatorApproved;  
        bool isSettled;
    }

    mapping(uint256 => Escrow) public escrows;

    constructor() Ownable(msg.sender) {}

    function depositCustom(
        uint256 _id, address _c, address _p, uint256 _dl, uint256 _pBps, uint256 _cBps
    ) external payable onlyOwner {
        // Validation: Now must total 98% because fee is 2%
        require(_pBps + _cBps + PROTOCOL_FEE_BPS == 10000, "BPS must total 100%");
        uint256 pCut = (msg.value * PROTOCOL_FEE_BPS) / 10000;
        accumulatedFees += pCut;

        escrows[_id] = Escrow({
            creator: _c, platform: _p,
            creatorLocked: (msg.value * _cBps) / 10000,
            platformLocked: (msg.value * _pBps) / 10000,
            deadline: _dl,
            platformApproved: false,
            creatorApproved: false,
            isSettled: false
        });
        
        if(_id > totalEscrows) totalEscrows = _id; 
    }

    // Backend-triggered auto-release
    function autoRelease(uint256 _id) external onlyOwner nonReentrant {
        Escrow storage e = escrows[_id];
        require(!e.isSettled, "Already settled");

        bool bothApproved = (e.platformApproved && e.creatorApproved);
        require(bothApproved || block.timestamp > e.deadline, "Not ready");

        if (block.timestamp > e.deadline && !e.platformApproved) {
            uint256 penalty = (e.platformLocked * PENALTY_BPS) / 10000;
            e.platformLocked -= penalty;
            accumulatedFees += penalty; 
        }

        uint256 cAmount = e.creatorLocked;
        uint256 pAmount = e.platformLocked;

        e.creatorLocked = 0;
        e.platformLocked = 0;
        e.isSettled = true;

        payable(e.creator).transfer(cAmount);
        payable(e.platform).transfer(pAmount);
    }

    function canRelease(uint256 _id) external view returns (bool) {
        Escrow storage e = escrows[_id];
        if (e.isSettled) return false;
        return (e.platformApproved && e.creatorApproved) || block.timestamp > e.deadline;
    }

    function collectFees() external onlyOwner {
        uint256 val = accumulatedFees;
        accumulatedFees = 0;
        payable(owner()).transfer(val);
    }
}