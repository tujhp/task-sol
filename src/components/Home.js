import React, { Component } from 'react'

class Home extends Component {

  render() {
    return (
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
              <h1>Balance: {this.props.shopContractBalance}</h1>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Home;
