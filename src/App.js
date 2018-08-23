import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

// API key is moved to the back end, because of security reasons 

// Configuration particles on the background
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

// Initialise app
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }

  loadUser = data => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }
    })
  }

  // Calculates the location of the detected face and returns it
  calculateFaceLocation = data => {
    const dataArray = data.outputs[0].data.regions;
    const faceCoordinates = dataArray.map(el => el.region_info.bounding_box);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const faceBoxPositions = faceCoordinates.map(coordinatesArr => {
      return {
        leftCol: coordinatesArr.left_col * width,
        topRow: coordinatesArr.top_row * height,
        rightCol: width - coordinatesArr.right_col * width,
        bottomRow: height - coordinatesArr.bottom_row * height
      };
    });
    return faceBoxPositions;
  };

  // This function receives the face's locations and updates the state
  displayFaceBox = box => {
    this.setState({
      box: box
    });
  };

  // Get the value of the url input
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  // Clarifai API to detect faces
  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
      fetch('https://immense-lowlands-48531.herokuapp.com/imageurl', {
        method: 'post',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
          if(response) {
            this.displayFaceBox(this.calculateFaceLocation(response)) 
            fetch('https://immense-lowlands-48531.herokuapp.com/image', {
              method: 'put',
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                id: this.state.user.id,
                numberOfFaces: this.state.box.length
              })
            })
            .then(res => res.json())
            .then(count => {
              // Object assign allows us to just update the entries property 
              // instead of the whole object
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log(err))
          } 
          console.log(this.state.box.length)
        } 
      )
      .catch(error => console.log(error));
  };

  // Route config
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
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
        <Navigation 
          name={this.state.user.name} 
          entries={this.state.user.entries} 
          isSignedIn={this.state.isSignedIn} 
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? 
          <div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
          : (
              this.state.route === 'signin' ?
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
          }
      </div>
    );
  }
}

export default App;
