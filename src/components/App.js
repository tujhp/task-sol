import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import ZNToken from '../abis/ZNToken.json'
import ShopContract from '../abis/ShopContract.json'
import Web3 from 'web3'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await window.web3.eth.getAccounts();
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    //Load ZNToken
    const znTokenData = ZNToken.networks[networkId]
    if(znTokenData) {
      const znToken = new web3.eth.Contract(ZNToken.abi, znTokenData.address)
      this.setState({ znToken })
      let znTokenBalance = await znToken.methods.balanceOf(this.state.account).call()
      this.setState({ znTokenBalance: znTokenBalance.toString()})
    } else {
      window.alert('ZNToken contract not deployed to detected network')
    }

    //Load ShopContract
    const shopContractData = ShopContract.networks[networkId]
    if(shopContractData) {
      const shopContract = new web3.eth.Contract(ShopContract.abi, shopContractData.address)
      this.setState({ shopContract })
    } else {
      window.alert('ShopContrct is not deployed')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x',
      znToken: {},
      shopContract: {},
      znTokenBalance: '0',
      shopContractBalance: '0',
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                <h1>Hello, World!</h1>
                <h1>Balance: {window.web3.utils.fromWei(this.state.znTokenBalance, 'Ether')}</h1>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;