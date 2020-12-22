import React, { Component } from 'react';

class CustomerRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: '',
      customer_password: '',
      customer_phone_number: 0,
      customer_address: '',
      customer_email: '',
    };
    this.submitDatas = this.submitDatas.bind(this);
  }

  submitDatas(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('customer_name', this.state.customer_name);
    formData.append('customer_password', this.state.customer_password);
    formData.append('customer_phone_number', this.state.customer_phone_number);
    formData.append('customer_address', this.state.customer_address);
    formData.append('customer_email', this.state.customer_email);
    fetch('http://127.0.0.1:8000/CustomerRegistration', {
      method: 'POST',
      body: formData,
    });

    alert('success');
    window.location.reload();
  }

  render() {
    return (
      <div id='CustomerRegistration'>
        <form onSubmit={this.submitDatas}>
          customer name:
          <input
            type='text'
            onChange={(event) =>
              this.setState({ customer_name: event.target.value })
            }
          />
          <br />
          customer password:
          <input
            type='password'
            onChange={(event) =>
              this.setState({ customer_password: event.target.value })
            }
          />
          <br />
          customer phone number :
          <input
            type='number'
            onChange={(event) =>
              this.setState({ customer_phone_number: event.target.value })
            }
          />
          <br />
          customer address:
          <input
            type='text'
            onChange={(event) =>
              this.setState({ customer_address: event.target.value })
            }
          />
          <br />
          customer email:
          <input
            type='email'
            onChange={(event) =>
              this.setState({ customer_email: event.target.value })
            }
          />
          <br />
          <input type='submit' name='submit' />
        </form>
        <button type='button' onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default CustomerRegistration;
