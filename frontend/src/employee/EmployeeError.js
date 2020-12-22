import React, { Component } from 'react';

class EmployeeError extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { data: props.data };
  }
  render() {
    return <div id='EmployeeError'>{this.state.data}</div>;
  }
}

export default EmployeeError;
