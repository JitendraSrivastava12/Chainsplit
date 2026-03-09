import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();

  console.log("----------------------------------------------------");
  console.log("Deploying ChainSplit with account:", deployer.address);
  
  // Get the balance of the deployer to ensure you have Sepolia ETH
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Get the contract factory
  const ChainSplit = await ethers.getContractFactory("ChainSplit");

  console.log("Deploying contract...");
  
  // Deploy the contract
  const chainSplit = await ChainSplit.deploy();

  // Wait for the deployment to be confirmed on the blockchain
  await chainSplit.waitForDeployment();

  const address = await chainSplit.getAddress();

  console.log("----------------------------------------------------");
  console.log("SUCCESS!");
  console.log("ChainSplit Protocol deployed to:", address);
  console.log("----------------------------------------------------");
  console.log("Action: Copy this address and save it in your .env file!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});