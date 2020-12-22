import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomerError from './CustomerError';
import { Link } from 'react-router-dom';

class CustomerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { customer_name: '', customer_password: '' };
    this.submitDatas = this.submitDatas.bind(this);
  }
  submitDatas(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/CustomerLogin', {
      method: 'POST',
      body: JSON.stringify({
        customer_name: this.state.customer_name,
        customer_password: this.state.customer_password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data['result'] === 'success') {
          this.props.history.push('/CustomerHome');
        } else {
          ReactDOM.render(
            <React.Fragment>
              <CustomerError data={data['result']} />
            </React.Fragment>,
            document.getElementById('insert')
          );
        }
      });
  }
  render() {
    return (
      <div id='CustomerLogin'>
        <form onSubmit={this.submitDatas}>
          Enter name:
          <input
            type='text'
            onChange={(event) =>
              this.setState({ customer_name: event.target.value })
            }
          />
          <br />
          Enter password:
          <input
            type='password'
            onChange={(event) =>
              this.setState({ customer_password: event.target.value })
            }
          />
          <br />
          <input type='submit' name='login' />
        </form>
        <div id='insert'></div>
        <Link to='/CustomerRegistration'>CustomerRegistration</Link>
        <button type='button' onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default CustomerLogin;
