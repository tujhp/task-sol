import React, { Component } from 'react'

class Cart extends Component {

  render() {
    let cart = {}
    let result = this.props.getCart().then((result) => {
      for (let i = 0; i < result.length; i++) {
          if(cart[result[i].name]) {
            cart[result[i].name].amount += 1
            cart[result[i].name].price = (Number.parseInt(result[i].price) + Number.parseInt(cart[result[i].name].price)).toString()
            continue;
          }
          cart[result[i].name] = {price: result[i].price, amount: 1};
      }
      

      let content = ''
      for (var key in cart) {
        content += `
        <tr id="test">
          <th scope="row" class="border-0">
            <div class="p-2">
              <div class="ml-3 d-inline-block align-middle">
                <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${key}</a></h5>
              </div>
            </div>
          </th>
          <td class="border-0 align-middle"><strong>${cart[key].price} ZN</strong></td>
          <td class="border-0 align-middle"><strong>${cart[key].amount}</strong></td>
        </tr>
        `
        document.getElementsByTagName("tbody")[0].innerHTML = content
      }
    })

    this.props.summCart(this.props.account).then((result) => {
      document.getElementsByClassName("total")[0].innerHTML = `<h4>Total: ${result} ZN</h4>`
    })
    return (
      <div style={{marginTop: 30 +'px'}} class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 bg-light">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                </tr>
              </thead>
              <tbody class="cart">
              </tbody>
            </table>
            <div class="total" style={{marginLeft: 30 +"px"}}></div>
            <button style={{marginLeft: 30 +"px"}} type="submit" class="btn btn-danger" onClick={(event) => {
              event.preventDefault()
              this.props.clearCart()
            }}>Delete All</button>
            <button style={{marginLeft: 30 +"px"}} type="submit" class="btn btn-primary" onClick={(event) => {
              event.preventDefault()
              this.props.buyProducts()
            }}>Buy</button>
          </div>
    )
  }
}

export default Cart;
