import React, { Component } from 'react'

class Deposit extends Component {

    render() {
        return (
            <div style={{display: 'block', textAlign: 'center', marginTop: 10 + '%', marginBottom: 5 + '%'}}>
                <h1>Пополнение баланса</h1>
                <form style={{width: 450 + 'px', 
                            display: 'inline-block', 
                            marginLeft: 'auto', 
                            marginRight: 'auto', 
                            marginTop: 20 +'px', 
                            textAlign: 'left'}} 
                        onSubmit={(event) => {
                            event.preventDefault()
                            let sum = this.input.value.toString()
                            this.props.deposit(window.web3.utils.toWei(sum, 'Ether'))

                        }}>
                <div class="form-group">
                    <label for="exampleInputPassword1">Сумма пополнения</label>
                    <input type="text" ref={(input) => {this.input = input}} class="form-control" placeholder="1 Ether"/>
                </div>
                <button type="submit" class="btn btn-primary">Пополнить</button>
                </form>
                <h3 style={{marginTop: 30+'px'}}>Your promocode:</h3>
                <h3><span class="promocode"></span></h3>
            </div>
            )
      }
}

export default Deposit;