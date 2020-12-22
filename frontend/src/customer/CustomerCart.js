import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomerDeleteCart from './CustomerDeleteCart';

class CustomerCart extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/CustomerCart')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data['values'].map((value) => (
            <div>
              <li key={value[0]}>
                {value[0]} {value[1]} {value[2]}
              </li>
              <button
                type='button'
                onClick={() => {
                  ReactDOM.render(
                    <CustomerDeleteCart data={value[0]} />,
                    document.getElementById('delete')
                  );
                  window.location.reload();
                }}>
                Delete
              </button>
            </div>
          )),
        });
      })
      .then(() =>
        ReactDOM.render(
          <ul>{this.state.data}</ul>,
          document.getElementById('insertCart')
        )
      );
  }

  render() {
    return (
      <div id='CustomerCart'>
        cart
        <div id='insertCart'></div>
        <div id='delete'></div>
        <button type='button' onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default CustomerCart;
