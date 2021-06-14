
const ShopContract = artifacts.require('ShopContract')

module.exports = async function(deployer) {
  //Deploy ShopContract
  await deployer.deploy(ShopContract)
  const shopContract = await ShopContract.deployed()
}
