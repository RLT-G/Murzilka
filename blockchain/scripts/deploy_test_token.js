async function main() {
    // Получаем аккаунты
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);

    // Создаем экземпляр контракта
    const Token = await ethers.getContractFactory("TestToken");
    
    // Разворачиваем контракт
    const token = await Token.deploy();
    console.log("Token deployed to:", token.address);
}

// Запускаем развертывание
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
