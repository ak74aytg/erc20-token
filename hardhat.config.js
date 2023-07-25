require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.6",
  gasReporter:{
    enabled:true,
    currency:"INR",
    noColors:true,
    outputFile:"gasReport.txt",
    coinmarketcap:"bb85ce5f-fde9-43e4-9ee4-58555df17ead",
    token:"matic",
  }
};
