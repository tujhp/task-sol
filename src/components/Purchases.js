import React, { Component } from 'react'

class Purchases extends Component {
  render() {
    this.props.getPurchased().then((result) => {
      let purchases = {}
      for (let i = 0; i < result.length; i++) {
        if (purchases[result[i]]) {
          purchases[result[i]]+=1
          continue
        }
        purchases[result[i]] = 1
      }
      let content = ''
      for (var key in purchases) {
        content += `
        <tr id="test">
          <th scope="row" class="border-0">
            <div class="p-2">
              <div class="ml-3 d-inline-block align-middle">
                <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${key}</a></h5>
              </div>
            </div>
          </th>
          <td class="border-0 align-middle"><strong>${purchases[key]}</strong></td>
        </tr>
        `
        document.getElementsByTagName("tbody")[0].innerHTML = content
      }
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
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                </tr>
              </thead>
              <tbody class="cart">
              </tbody>
            </table>
      </div>
    );
  }
}

export default Purchases;