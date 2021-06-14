import React, { Component } from 'react'

class Products extends Component {

  render() {
    let content = ""
    for(var product in this.props.products) {
      content += this.props.products[product].toString()
      content += " "
    }
    return (
      <div>
      <h1 style={{textAlign: 'center', marginTop: 5 + '%', marginBottom: 5 + '%'}}>Товары</h1>
      <div class="container">
      <div class="card-deck mb-3 text-center">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Ticket 1</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">500 ZN</h1>
            <form onSubmit={(event) => {
                            event.preventDefault()
                            let promocode = this.input.value.toString() || "0x0000000000000000000000000000000000000000000000000000000000000000"
                            let result = this.props.addProductToCart('Ticket 1', promocode)
                        }}>
                                    <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
            </ul>
            <button type="submit" class="btn btn-lg btn-block btn-primary">Добавить в корзину</button>
            </form>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Ticket 2</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">100 ZN</h1>
            <form onSubmit={(event) => {
                            event.preventDefault()
                            let promocode = this.input.value.toString() || "0x0000000000000000000000000000000000000000000000000000000000000000"
                            let result = this.props.addProductToCart('Ticket 2', promocode)
                        }}>
            <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
            </ul>
            <button type="submit" class="btn btn-lg btn-block btn-primary">Добавить в корзину</button>
            </form>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Flag</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">2000 ZN</h1>
            <form onSubmit={(event) => {
                            event.preventDefault()
                            let promocode = this.input.value.toString() || "0x0000000000000000000000000000000000000000000000000000000000000000"
                            let result = this.props.addProductToCart('Flag', promocode)
                        }}>
                                    <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
            </ul>
            <button type="submit" class="btn btn-lg btn-block btn-primary">Добавить в корзину</button>
            </form>
          </div>
        </div>
      </div>
      <input type="text" ref={(input) => {this.input = input}} class="form-control btn-lg btn-block" placeholder="Промокод"/>
      </div>
      </div>
    );
  }
}

export default Products;