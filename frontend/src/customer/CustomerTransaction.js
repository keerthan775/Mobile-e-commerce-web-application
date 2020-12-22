import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CustomerTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/CustomerTransaction')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data['values'].map((value) => (
            <li key={value[0]}>
              {value[0]} {value[1]} {value[2]}
            </li>
          )),
        });
      })
      .then(() =>
        ReactDOM.render(
          <ul>{this.state.data}</ul>,
          document.getElementById('insertTransaction')
        )
      );
  }

  render() {
    return (
      <div id='CustomerTransaction'>
        inside transaction
        <div id='insertTransaction'></div>
        <button type='button' onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default CustomerTransaction;
