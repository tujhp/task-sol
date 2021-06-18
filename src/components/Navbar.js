import React, { Component } from 'react'

class Navbar extends Component {

  render() {

    let forAdmin
    if (this.props.admin) {
      forAdmin = <li class="nav-item"><a class="nav-link active" href="/promocodes">Promocodes</a></li>
    }
    else {
      forAdmin = <li></li>
    }

    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">ZeroNights 2021</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/cart">Cart</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/purchases">Purchases</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/deposit">Deposit</a>
            </li>
            {forAdmin}
          </ul>
        </div>
      </div>
      <ul className="navbar-nav px-3">
      <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
             Balance:  {this.props.shopContractBalance} ZN

          </li>
        
        </ul>
    </nav>
    );
  }
}

export default Navbar;
