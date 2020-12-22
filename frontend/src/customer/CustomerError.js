import React, { Component } from 'react';

class CustomerError extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }
  render() {
    return <div>error{this.state.data}</div>;
  }
}

export default CustomerError;
