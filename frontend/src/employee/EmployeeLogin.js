import React, { Component } from 'react';
import EmployeeError from './EmployeeError';
import ReactDOM from 'react-dom';

class EmployeeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { employee_id: '', employee_password: '' };
    this.submitDatas = this.submitDatas.bind(this);
  }

  submitDatas(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/EmployeeLogin', {
      method: 'POST',
      body: JSON.stringify({
        employee_id: this.state.employee_id,
        employee_password: this.state.employee_password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data['result'] === 'success') {
          this.props.history.push('/EmployeeMain');
        } else {
          ReactDOM.render(
            <React.Fragment>
              <EmployeeError data={data['result']} />
            </React.Fragment>,
            document.getElementById('insert')
          );
        }
      });
  }
  render() {
    return (
      <div id='EmployeeLogin'>
        <form onSubmit={this.submitDatas}>
          <p>Enter employee id</p>
          <input
            type='text'
            onChange={(event) => {
              this.setState({ employee_id: event.target.value });
            }}
          />
          <p>Enter employee password</p>
          <input
            type='password'
            onChange={(event) => {
              this.setState({ employee_password: event.target.value });
            }}
          />
          <input type='submit' name='sumit' />
        </form>
        <div id='insert'></div>
        <button type='button' onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default EmployeeLogin;
