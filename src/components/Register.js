import React, { Component } from 'react'

class Register extends Component{
    render() {
        return (
            <div style={{display: 'block', textAlign: 'center', marginTop: 10 + '%', marginBottom: 5 + '%'}}>
                <h2>Регистрация</h2>
                <form style={{width: 450 + 'px', 
                            display: 'inline-block', 
                            marginLeft: 'auto', 
                            marginRight: 'auto', 
                            marginTop: 20 +'px', 
                            textAlign: 'left'}} 
                        onSubmit={(event) => {
                            event.preventDefault()
                            let username = this.input.value.toString()
                            this.props.register(username)
                        }}>
                <div class="form-group">
                    <label for="exampleInputPassword1">Login</label>
                    <label for="exampleInputEmail1"></label>
                    <input type="text" ref={(input) => {this.input = input}} class="form-control" placeholder="Enter login"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Wallet Address</label>
                    <input type="text" value={this.props.account} class="form-control" disabled/>
                </div>
                <button type="submit" class="btn btn-primary">Зарегестрироваться</button>
                </form>
            </div>
        )
    }
}

export default Register;