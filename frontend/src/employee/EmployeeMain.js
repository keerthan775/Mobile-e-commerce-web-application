import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Link to='/EmployeeHome'>EmployeeMain</Link>
        <Link to='/EmployeeDeleteModel'>EmployeeDeleteModel</Link>
        <button type='button' onClick={() => this.props.history.goBack()}>
        Back
      </button>
        </div>
    );
  }
}

export default EmployeeMain;
