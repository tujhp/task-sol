const ZNToken = artifacts.require('ZNToken')
const ShopContract = artifacts.require('ShopContract')

module.exports = async function(deployer) {
  //Deploy ZNToken
  await deployer.deploy(ZNToken)
  const znToken = await ZNToken.deployed()

  //Deploy ShopContract
  await deployer.deploy(ShopContract, znToken.address)
  const shopContract = await ShopContract.deployed()


//   // Deploy Mock DAI Token
//   await deployer.deploy(DaiToken)
//   const daiToken = await DaiToken.deployed()

//   // Deploy Dapp Token
//   await deployer.deploy(DappToken)
//   const dappToken = await DappToken.deployed()

//   // Deploy TokenFarm
//   await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
//   const tokenFarm = await TokenFarm.deployed()

//   // Transfer all tokens to TokenFarm (1 million)
//   await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

//   // Transfer 100 Mock DAI tokens to investor
//   await daiToken.transfer(accounts[1], '100000000000000000000')
}
