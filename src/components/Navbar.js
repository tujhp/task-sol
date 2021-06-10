import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import farmer from '../logo.svg'

class Navbar extends Component {

  render() {

    let forAdmin
    if (this.props.admin) {
      forAdmin = <li class="nav-item"><a class="nav-link active" href="/promocodes">Промокоды</a></li>
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
              <a class="nav-link active" aria-current="page" href="/products">Товары</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/purchases">Покупки</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/cart">Корзина</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/deposit">Внести средства</a>
            </li>
            {forAdmin}
          </ul>
        </div>
      </div>
      <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
    </nav>
    );
  }
}

export default Navbar;
