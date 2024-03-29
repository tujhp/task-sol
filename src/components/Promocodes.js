import React, { Component } from 'react'

class Promocodes extends Component {



  render() {
    if (this.props.admin) {
        return (
          <div style={{display: 'block', textAlign: 'center', marginTop: 10 + '%', marginBottom: 5 + '%'}}>
                <form style={{width: 450 + 'px', 
                            display: 'inline-block', 
                            marginLeft: 'auto', 
                            marginRight: 'auto', 
                            marginTop: 20 +'px', 
                            textAlign: 'left'}} 
                        onSubmit={(event) => {
                            event.preventDefault()
                            let sum = this.input.value.toString()
                            let result = this.props.generatePromocode(sum)
                        }}>
                <div class="form-group">
                    <input type="text" ref={(input) => {this.input = input}} class="form-control" placeholder="500 ZN"/>
                </div>
                <button type="submit" class="btn btn-primary">Get promocode</button>
                </form>
                <h3 style={{marginTop: 10+'px'}}>Maximum 400 ZN</h3>
                <h3 style={{marginTop: 10+'px'}}>Your promocode:</h3>
                <h3><span class="promocode"></span></h3>
            </div>


        )
    }
    return (
      <h1>Forbiden</h1>
    );
  }
}

export default Promocodes;