import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: "1eeb3f9c3a6a40728eb2bad5dc7c509c"
});

const particlesOptions = {
  particles: {
    number: {
      value: 25,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false
    };
  }

  calculateFaceLocation = data => {
    const clarifyFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - clarifyFace.right_col * width,
      bottomRow: height - clarifyFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({
      box: box
    });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log("click");
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(error => console.log(error));
  };

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({
        isSignedIn: false
      })
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      })
    }
    console.log(this.state.isSignedIn);
    this.setState({
      route: route
    })
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === "home" ? 
          <div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
          : (
              this.state.route === 'signin' ?
                <Signin onRouteChange={this.onRouteChange} />
              :
                <Register onRouteChange={this.onRouteChange} />
            )
          }
      </div>
    );
  }
}

export default App;
