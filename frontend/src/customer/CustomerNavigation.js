import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CustomerNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id='CustomerNavigation'>
        Navigation
        <Link to='/CustomerDetails'>customer Details</Link>
        <Link to='/CustomerCart'>Customer Cart</Link>
        <Link to='/CustomerTransaction'>Customer transaction</Link>
        <Link to='/CustomerUpdateDetails'>CustomerUpdateDetails</Link>
      </div>
    );
  }
}

export default CustomerNavigation;
