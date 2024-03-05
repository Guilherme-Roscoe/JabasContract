require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/9p7DImU9Tita4ukn7jbXXoTwxMaDJGcA",
      accounts: ["829d81d5b8a7649fe7dc3fc4ab7c703770e568dfa92f6bdf13cfe7860345fbe7"]
    },
  },
};