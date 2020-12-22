import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CustomerUpdateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    fetch('http://127.0.0.1:8000/CustomerDetails')
      .then((res) => res.json())
      .then((data) => {
        delete data['id'];
        delete data['customer_name'];
        this.state.data = Object.keys(data).map((key) => (
          <div>
            <li key={key}>
              {key} : {data[key]}
            </li>
            <button
              onClick={() =>
                ReactDOM.render(
                  <CustomerUpdateDetailsSend data={key} />,
                  document.getElementById('insertUpdate')
                )
              }>
              update
            </button>
          </div>
        ));
      })
      .then(() =>
        ReactDOM.render(
          <ul>{this.state.data}</ul>,
          document.getElementById('list')
        )
      );
  }

  render() {
    return (
      <div id='CustomerUpdateDetails'>
        update details
        <div id='list'></div>
        <div id='insertUpdate'></div>
        <button type='button' onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default CustomerUpdateDetails;

class CustomerUpdateDetailsSend extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data, new_value: '' };
    console.log(props);
    this.submitDatas = this.submitDatas.bind(this);
  }

  submitDatas(event) {
    //event.preventDefault();
    fetch('http://127.0.0.1:8000/CustomerUpdateDetails', {
      method: 'POST',
      body: JSON.stringify({
        attribute: this.state.data,
        new_value: this.state.new_value,
      }),
    });
  }

  render() {
    return (
      <div id='CustomerUpdateDetailsSend'>
        <form onSubmit={this.submitDatas}>
          Enter new {this.state.data}:
          <input
            type='text'
            onChange={(e) => this.setState({ new_value: e.target.value })}
          />
          <input type='submit' name='submit' />
        </form>
      </div>
    );
  }
}
