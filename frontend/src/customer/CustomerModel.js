import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomerInsertCart from './CustomerInsertCart';
import CustomerInsertTransaction from './CustomerInsertTransaction';

class CustomerModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model_id: this.props.match.params.model_id,
      images: [],
      model_details: null,
    };
  }

  componentDidMount() {
    //getting the images
    setTimeout(() => {
      let images = [];

      //getting images
      fetch('http://127.0.0.1:8000/image_count', {
        method: 'POST',
        body: JSON.stringify({ model_id: this.state.model_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          for (let row_num = 0; row_num < data['count']; row_num++) {
            fetch('http://127.0.0.1:8000/model_image', {
              method: 'POST',
              body: JSON.stringify({
                model_id: this.state.model_id,
                row_num: row_num,
              }),
            })
              .then((res) => res.blob())
              .then((data) => {
                images.push(
                  <img
                    src={URL.createObjectURL(data)}
                    alt='images'
                    height='100px'
                    width='100px'
                  />
                );
              });
          }
        });
      this.setState({ images: images });
    }, 1000);

    //Rendering the images
    setTimeout(() => {
      ReactDOM.render(
        <div>{this.state.images}</div>,
        document.getElementById('modelImages')
      );
    }, 2000);

    //Getting the details
    setTimeout(() => {
      fetch('http://127.0.0.1:8000/model_details', {
        method: 'POST',
        body: JSON.stringify({ model_id: this.state.model_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ model_details: data });
          console.log(this.state.model_details);
        });
    }, 1000);

    //rendering the details
    setTimeout(() => {
      ReactDOM.render(
        <div>
          {Object.keys(this.state.model_details).map((value) => (
            <li key={value}>{this.state.model_details[value]}</li>
          ))}
        </div>,
        document.getElementById('modelDetails')
      );
    }, 2000);
  }
  render() {
    return (
      <div>
        {this.state.model_id}
        <div id='modelImages'></div>
        <ul id='modelDetails'></ul>

        <button
          type='button'
          onClick={() =>
            ReactDOM.render(
              <CustomerInsertCart data={this.state.model_id} />,
              document.getElementById('insertButton')
            )
          }>
          Add cart
        </button>
        <button
          type='button'
          onClick={() =>
            ReactDOM.render(
              <CustomerInsertTransaction data={this.state.model_id} />,
              document.getElementById('insertButton')
            )
          }>
          Buy now
        </button>
        <div id='insertButton'></div>
        <button type='button' onClick={() => window.close()}>
          Back
        </button>
      </div>
    );
  }
}

export default CustomerModel;
