require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// ALCHEMY API KEY
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY

// GOERLI PRIVATE KEY
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`],
    },
  },
};
