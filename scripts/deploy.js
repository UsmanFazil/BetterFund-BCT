// scripts/deploy.js
async function main() {
    const BetterFund = await ethers.getContractFactory("BetterFund");
    console.log("Deploying BetterFund...");
    const betterfund = await upgrades.deployProxy(BetterFund);
    console.log("BetterFund deployed to:", betterfund.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });