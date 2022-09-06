require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/rS-oouYBLwblb-GQzmxq7id4_79W1SUv",
      accounts: ["45cf7f4be6e56d64b169d6111f57383bf8cdd737b4b6034a9b8721a0e7bf85cc"],
    },
  },
};
