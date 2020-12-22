import React, { Component } from 'react';

class EmployeeDeleteModel extends Component {
  constructor(props) {
    super(props);
    this.state = { model_id: '' };
    this.submitDatas = this.submitDatas.bind(this);
  }

  submitDatas(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/delete_model', {
      method: 'POST',
      body: JSON.stringify({ model_id: this.state.model_id }),
    });
  }

  render() {
    return (
      <div id='EmployeeDeleteModel'>
        <form onSubmit={this.submitDatas}>
          Enter Model Id:
          <input
            type='text'
            onChange={(e) => this.setState({ model_id: e.target.value })}
          />
          <input type='submit' name='submit' />
        </form>
        <button type='button' onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
}

export default EmployeeDeleteModel;
