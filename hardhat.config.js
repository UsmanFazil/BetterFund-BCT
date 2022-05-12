require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },

  defaultNetwork: "client",
  networks: {
    client: {
      url:
        process.env.RPC_CLIENT_URL || "https://matic-mumbai.chainstacklabs.com",
      accounts: [
        process.env.PRIVATE_KEY ||
          "",
      ],
    },
    hardhat: {
      forking: {
        url:
          process.env.POLYGON_RPC_CLIENT_URL ||
          "https://matic-mainnet.chainstacklabs.com",
        blockNumber: 28171596,
        accounts: [
          process.env.PRIVATE_KEY ||
            "",
        ],
      },
    },
  },
  mocha: {
    timeout: 120000,
  },
};
