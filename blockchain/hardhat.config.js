/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    networks:{
      hardhat:{},
      polygon:{
        url: 'https://polygon-mumbai.g.alchemy.com/v2/O0NoeH1LAg3fNJKYjtNoDAHVW1QsAmWk',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};