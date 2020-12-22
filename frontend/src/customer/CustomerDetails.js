import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    fetch('http://127.0.0.1:8000/CustomerDetails')
      .then((res) => res.json())
      .then((data) => {
        this.state.data = Object.keys(data).map((key) => (
          <li key={key}>{data[key]}</li>
        ));
      })
      .then(() =>
        ReactDOM.render(
          <ul>{this.state.data}</ul>,
          document.getElementById('list')
        )
      );
    console.log(this.state.data);
  }
  render() {
    return (
      <div id='CustomerDetails'>
        details
        <div id='list'></div>
        <button type='button' onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default CustomerDetails;
