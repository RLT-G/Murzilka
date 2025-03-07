async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Staking = await ethers.getContractFactory("Staking");
  
    // Убедитесь, что передаёте только один аргумент: адрес токена
    const stakingTokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";  // Здесь укажите адрес токена для стейкинга
  
    const staking = await Staking.deploy(stakingTokenAddress);
  
    console.log("Staking contract deployed to:", staking.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  