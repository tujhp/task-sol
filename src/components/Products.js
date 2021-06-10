import React, { Component } from 'react'

class Products extends Component {

  render() {
    let content = ""
    for(var product in this.props.products) {
      content += this.props.products[product].toString()
      content += " "
      console.log(product)
    }
    return (
      <div>
      <h1 style={{textAlign: 'center', marginTop: 5 + '%', marginBottom: 5 + '%'}}>Товары</h1>
      <div class="container">
      <div class="card-deck mb-3 text-center">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Входной билет</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">10900 ZN</h1>
            <form onSubmit={(event) => {
                            event.preventDefault()
                            let promocode = this.input.value.toString()
                            console.log("promocode: ", promocode)
                            let price = 100
                            let result = this.props.addProductToCart('prod 1', promocode)
                        }}>
            <button type="submit" class="btn btn-lg btn-block btn-primary">Добавить в корзину</button>
            </form>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Студенческий билет</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">3490 ZN</h1>
            <form>
            <button type="button" class="btn btn-lg btn-block btn-primary">Добавить в корзину</button>
            </form>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Билет с флагом</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">13333337 ZN</h1>
            <form>
            <button type="button" class="btn btn-lg btn-block btn-primary">Добавить в корзину</button>
            </form>
          </div>
        </div>
        <input type="text" ref={(input) => {this.input = input}} class="form-control btn-lg btn-block" placeholder="Промокод"/>

      </div>
      </div>
      </div>
    );
  }
}

export default Products;