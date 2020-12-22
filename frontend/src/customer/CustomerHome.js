import React, { Component } from 'react';
import CustomerHeader from './CustomerHeader';
import CustomerNavigation from './CustomerNavigation';
import CustomerSection from './CustomerSection';
import CustomerFooter from './CustomerFooter';

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id='CustomerHome'>
        <CustomerHeader />
        <CustomerNavigation />
        <CustomerSection />
        <button type='button' onClick={() => this.props.history.goBack()}>
          Logout
        </button>
        <CustomerFooter />
      </div>
    );
  }
}

export default CustomerHome;
