import React, { Component } from 'react';
import web3 from './web3';
import property from './property';
import './App.css';

class App extends Component {

    
state = {

builder: '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
investor: '0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE',
buyer: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',

avail: 40000,
price: 500,
rooms: 10,
cf: 1,
closingRemark:'bc',

investor_booking: 0,
buyer_booking: 0
};


async componentDidMount() {
const builder = await property.methods.builder().call();
const buyer = await property.methods.buyer().call();
const investor = await property.methods.investor().call();
const avail = await property.methods.avail().call();
//const seller = await property.methods.seller().call();
//const balance = await web3.eth.getBalance(property.options.address);
console.log("builder ", builder);
console.log("buyer ", buyer);
console.log("investor ", investor);
//console.log("builder ", builder);

this.setState({ builder,buyer,investor,avail});
}



investor_buy= async (event) => {
event.preventDefault();
const accounts = await web3.eth.getAccounts();
console.log("this.state.investor_booking ", this.state.investor_booking);
const weiAmount = web3.utils.toWei(this.state.investor_booking, 'ether');
await property.methods.little_prop(this.state.investor_booking).send({
from: accounts[0],
value : weiAmount
});

this.setState({ investor: accounts[0] });
}
/*
print_avail= async (event) => {
    event.preventDefault();
    var avail = await property.methods.avail().call();
    this.state.avail  = avail ;
}
*/
buyer_buy= async (event) => {
event.preventDefault();
const accounts = await web3.eth.getAccounts();
const weiAmount = web3.utils.toWei(this.state.buyer_booking, 'ether');
await property.methods.buy(this.state.buyer_booking).send({
from: accounts[0],
value : weiAmount
});
this.setState({ buyer: accounts[0] });
    
}


onStartSubmit = async (event) => {
event.preventDefault();
const accounts = await web3.eth.getAccounts();
this.setState({ builder: accounts[0] });
}

onFinishSubmit = async (event) => {
event.preventDefault();
const accounts = await web3.eth.getAccounts();

await property.methods.allpropsold().send({
from: accounts[0]//'0x9fbda871d559710256a2502a2517b794b482db40',
//to : accounts[0]
});
this.setState({ closingRemark: 'Selling has been closed.' })
}

show = async (event) => {
event.preventDefault();
//var arr = await property.methods.bahot_ids().call();
//for(var i in arr) {
//        "<p>" + (i) + "</p>";
  //  }

}

render() {
return (
<div>
<div class="App-header">
  	<h1>Property Tokenization dApp</h1>
     <button onClick={this.onStartSubmit}>Start Selling property</button>
     </div>
     <hr />
    <div class="App-header">
    <h1>Investor</h1>
    
    <p>The availble area is  "{this.state.avail}" sqft </p> 
    <input value={this.state.investor_booking}
    onChange={event => this.setState({ investor_booking: event.target.value })}
    />
    <button onClick={this.investor_buy}>Buy</button>
 
    </div>
    <hr />  
<div class="App-header">
    <h1>Buyer</h1>
    <p>400 Square Feet per Appartment</p>
    <p>(Put in the room no. i.e in range 1 to 10 only)</p>

    <input
                value={this.state.buyer_booking}
                onChange={event => this.setState({ buyer_booking: event.target.value })}
                />
                
                <button onClick={this.buyer_buy}> Buy </button>
   

    
    </div>
<hr />
<div class="App-header">

    <p>Closing Selling</p>
                <button onClick={this.onFinishSubmit}>Close Selling</button>
</div>
                
</div>
);
}
}
export default App;

