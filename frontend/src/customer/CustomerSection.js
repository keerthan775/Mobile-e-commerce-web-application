import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CustomerSection extends Component {
  constructor(props) {
    super(props);
    this.state = { element: [], element1: [] };
    fetch('http://127.0.0.1:8000/ModuleCount')
      .then((res) => res.json())
      .then((data) => {
        fetch('http://127.0.0.1:8000/modelid_list')
          .then((res) => res.json())
          .then((data) => {
            for (let id of data.model_id) {
              fetch('http://127.0.0.1:8000/Image', {
                method: 'POST',
                body: JSON.stringify({ mobile_model_id: id }),
              })
                .then((res) => res.blob())
                .then((data) => {
                  this.state.element.push(
                    <button
                      type='button'
                      onClick={() => window.open('/CustomerModel' + id)}>
                      <img
                        src={URL.createObjectURL(data)}
                        alt='images'
                        height='100px'
                        width='100px'
                      />
                    </button>
                  );
                });
            }
          });
      })

      .then(() =>
        setTimeout(() => {
          ReactDOM.render(
            <div>{this.state.element}</div>,
            document.getElementById('image')
          );
        }, 5000)
      );
  }

  render() {
    return (
      <div>
        <div id='insertImage'>
          <div id='image'></div>
          <div id='click'></div>
        </div>
      </div>
    );
  }
}

export default CustomerSection;
