import React, { Component } from 'react';

class CustomerInsertCart extends Component {
  constructor(props) {
    super(props);
    this.state = { model_id: props.data };
    fetch('http://127.0.0.1:8000/insert_cart', {
      method: 'POST',
      body: JSON.stringify({
        model_id: this.state.model_id,
        date: new Date().toString(),
      }),
    });
  }
  render() {
    return <div id='CustomerInsertCart'>Item added to cart</div>;
  }
}

export default CustomerInsertCart;
