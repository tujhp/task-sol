import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import ShopContract from '../abis/ShopContract.json'
import Web3 from 'web3'
import Register from './Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cart from './Cart'
import Home from './Home'
import Products from './Products'
import Purchases from './Purchases'
import Promocodes from './Promocodes'
import Deposit from './Deposit'

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

    //Load ShopContract
    const shopContractData = ShopContract.networks[networkId]
    if(shopContractData) {
      const shopContract = new web3.eth.Contract(ShopContract.abi, shopContractData.address)
      const shopContractBalance = await shopContract.methods.balanceOf(this.state.account).call()
      this.setState({ shopContract })
      this.setState({ shopContractBalance: shopContractBalance.toString()})
    } else {
      window.alert('ShopContract is not deployed')
    }

    let isRegistered =  await this.isRegistered(this.state.account)
    let isAdmin = await this.isAdmin(this.state.account)
    let products = await this.getProducts()

    let cart = await this.getCart()
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
    let result = await this.state.shopContract.methods.isRegister().call({from:this.state.account})
    return result
  }

  async isAdmin(account) {
    let result = await this.state.shopContract.methods.isAdmin().call({from: this.state.account})
    return result;
  }

  register = (username) => {
    this.setState({ username: username })
    this.state.shopContract.methods.register(username, 'user').send({ from: this.state.account }).on('transactionHash', (hash) => {
      window.location.href = "/"
    })
  }


  generatePromocode = (sum) => {
    try {
      let result = this.state.shopContract.methods.getPromocode(sum).send({from: this.state.account}).on('transactionHash', (hash) => {
        this.getPromocode(sum).then((result) => {
          document.getElementsByClassName("promocode")[0].innerHTML = `<h2>${result}</h2>`
        })
        
      })
      return result
  }
    catch  {
      alert('Incorrect amount')
    }
  }

  getPromocode = (sum) => {
    let result = this.state.shopContract.methods.getPromocode(sum).call({from: this.state.account})
    return result
  }

  deposit = (amount) => {
    if (amount < 0) {
      alert("Только положительные числа")
      return
    }
    this.state.shopContract.methods.deposit().send({from: this.state.account, value: amount})
  }

  addProductToCart = (name, promocode="0x0000000000000000000000000000000000000000000000000000000000000000") => {
    try {
    this.state.shopContract.methods.addProductToCart(name, promocode).send({from: this.state.account})
  }
  catch {
    alert("Promocode is incorrect")
  }
  }

  getCart = () => {
    let result = this.state.shopContract.methods.getCart().call({from: this.state.account})
    return result
  }

  getPurchased = () => {
    let result = this.state.shopContract.methods.getPurchased().call({from: this.state.account})
    return result
  }

  buyProducts = () => {
      let result = this.state.shopContract.methods.buyProducts().send({from: this.state.account})
  }

  summCart = (account) => {
    let result = this.state.shopContract.methods.summCart(account).call({from: this.state.account});
    return result
  }

  clearCart= () => {
    this.state.shopContract.methods.clearCart().send({from: this.state.account})
  }
  
  
 async getProducts() {
    let products = {'Flag': 0, 'Ticket 1': 0, 'Ticket 2': 0}
    for(var key in products) {
      products[key] = await this.state.shopContract.methods.products(key).call({from: this.state.account})
    }
    return products
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x',
      znToken: {},
      shopContract: {},
      shopContractBalance: '0',
      registered: false,
      admin: false,
      loading: true,
      products: {}
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
                  shopContractBalance={this.state.shopContractBalance}
                  admin={this.state.admin} />
          <Router>
            <Switch>
              <Route exact path="/" render={(props) => (<Products {...this.state} addProductToCart={this.addProductToCart} products={this.state.products}/>)}/>
              <Route path="/cart" render={(props) => (<Cart {...this.state} clearCart={this.clearCart} getCart={this.getCart} summCart={this.summCart} buyProducts={this.buyProducts}/>)}/>
              <Route path="/purchases" render={(props) => (<Purchases {...this.state} getPurchased={this.getPurchased}/>)}/>
              <Route path="/deposit" render={(props) => (<Deposit {...this.state} deposit={this.deposit}/>)}/>
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