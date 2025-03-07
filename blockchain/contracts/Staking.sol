// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    IERC20 public stakingToken;  // ERC-20 токен для стейкинга
    address public owner;        // Владелец контракта

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount, uint256 time);
    event Unstaked(address indexed user, uint256 amount, uint256 time);

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
        owner = msg.sender;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(stakingToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        stakes[msg.sender].amount += _amount;
        stakes[msg.sender].startTime = block.timestamp;

        emit Staked(msg.sender, _amount, block.timestamp);
    }


    function unstake() external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No active stake");

        uint256 amount = userStake.amount;
        delete stakes[msg.sender];

        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");
        emit Unstaked(msg.sender, amount, block.timestamp);
    }

    function getStake(address _user) external view returns (uint256 amount, uint256 startTime) {
        Stake storage userStake = stakes[_user];
        return (userStake.amount, userStake.startTime);
    }
}
