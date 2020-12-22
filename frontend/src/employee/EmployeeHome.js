import React, { Component } from 'react';

class EmployeeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_model_id: '',
      mobile_name: '',
      mobile_screen: '',
      mobile_camer: '',
      mobile_battery: '',
      mobile_ram: '',
      mobile_rom: '',
      mobile_os: '',
      mobile_warranty: '',
      mobile_amount: '',
      mobile_image: null,
    };
    this.submitData = this.submitData.bind(this);
  }

  submitData(event) {
    event.preventDefault();
    console.log(this.state);
    let formData = new FormData();
    formData.append('mobile_model_id', this.state.mobile_model_id);
    formData.append('mobile_name', this.state.mobile_name);
    formData.append('mobile_screen', this.state.mobile_screen);
    formData.append('mobile_camera', this.state.mobile_camera);
    formData.append('mobile_battery', this.state.mobile_battery);
    formData.append('mobile_ram', this.state.mobile_ram);
    formData.append('mobile_rom', this.state.mobile_rom);
    formData.append('mobile_os', this.state.mobile_os);
    formData.append('mobile_warranty', this.state.mobile_warranty);
    formData.append('mobile_amount', this.state.mobile_amount);
    for (let i in this.state.mobile_image) {
      formData.append('mobile_image' + i, this.state.mobile_image[i]);
    }

    fetch('http://127.0.0.1:8000/EmployeeHome', {
      method: 'POST',
      body: formData,
    });

    alert('success');
    window.location.reload();
  }
  render() {
    return (
      <div id='EmployeeHome'>
        <form onSubmit={this.submitData}>
          mobile_model_id
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_model_id: event.target.value })
            }
          />
          <br />
          mobile_name
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_name: event.target.value })
            }
          />
          <br />
          mobile_screen
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_screen: event.target.value })
            }
          />
          <br />
          mobile_camera
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_camera: event.target.value })
            }
          />
          <br />
          mobile_battery
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_battery: event.target.value })
            }
          />
          <br />
          mobile_ram
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_ram: event.target.value })
            }
          />
          <br />
          mobile_rom
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_rom: event.target.value })
            }
          />
          <br />
          mobile_os
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_os: event.target.value })
            }
          />
          <br />
          mobile_warranty
          <input
            type='text'
            onChange={(event) =>
              this.setState({ mobile_warranty: event.target.value })
            }
          />
          <br />
          mobile_amount
          <input
            type='Number'
            onChange={(event) =>
              this.setState({ mobile_amount: event.target.value })
            }
          />
          <br />
          mobile_image
          <input
            type='file'
            onChange={(event) =>
              this.setState({ mobile_image: event.target.files })
            }
            multiple
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

export default EmployeeHome;
