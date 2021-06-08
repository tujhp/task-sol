import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import ZNToken from '../abis/ZNToken.json'
import ShopContract from '../abis/ShopContract.json'
import Web3 from 'web3'
import Register from './Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from './Main'
import Cart from './Cart'
import Home from './Home'
import Products from './Products'
import Purchases from './Purchases'
import Promocodes from './Promocodes'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await window.web3.eth.getAccounts();
    this.setState({ account: accounts[0] })
    console.log('LoadBlockchain')
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

    let isRegistered =  await this.isRegistered(this.state.account)
    let isAdmin = await this.isAdmin(this.state.account)
    this.setState({ admin: isAdmin })
    this.setState({ registered: isRegistered })
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

  async isRegistered(account) {
    let result = await this.state.shopContract.methods.isRegister(account).call({from:this.state.account})
    return result
  }

  async isAdmin(account) {
    let result = await this.state.shopContract.methods.isAdmin(account).call({from: this.state.account})
    return result;
  }

  register = (username) => {
    this.setState({ username: username })
    this.state.shopContract.methods.register(username, 'user').send({ from: this.state.account }).on('transactionHash', (hash) => {
      window.location.href = "/"
    })
  }

  generatePromocode = (sum) => {
    let result = this.state.shopContract.methods.getPromocode(sum).call({from: this.state.account})
    return result
  }

  




  constructor(props) {
    super(props)
    this.state = {
      account: '0x',
      znToken: {},
      shopContract: {},
      znTokenBalance: '0',
      shopContractBalance: '0',
      registered: false,
      admin: false,
      loading: true
    }
  }

  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    }
    else if(this.state.registered == true) {
        content = <div>
          <Navbar account={this.state.account}
                  admin={this.state.admin} />
          <Router>
            <Switch>
              <Route exact path="/" render={(props) => (<Home {...this.state}/>)}/>
              <Route path="/products" render={(props) => (<Products {...this.state}/>)}/>
              <Route path="/cart" render={(props) => (<Cart {...this.state}/>)}/>
              <Route path="/purchases" render={(props) => (<Purchases {...this.state}/>)}/>
              <Route path="/promocodes" render={(props) => (<Promocodes {...this.state} generatePromocode={this.generatePromocode}/>)}/>
            </Switch>
          </Router>
        </div>
      
    } else {
        content = <Register register={this.register} account={this.state.account}/>
    }

    return content;
  }
}

export default App;