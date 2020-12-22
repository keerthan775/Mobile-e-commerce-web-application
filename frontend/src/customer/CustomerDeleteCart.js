import React, { Component } from 'react';

class CustomerDeleteCart extends Component {
  constructor(props) {
    super(props);
    this.state = { model_id: props.data };
    fetch('http://127.0.0.1:8000/delete_cart', {
      method: 'POST',
      body: JSON.stringify({ model_id: this.state.model_id }),
    });
  }
  render() {
    return <div id='CustomerDeleteCart'></div>;
  }
}

export default CustomerDeleteCart;
