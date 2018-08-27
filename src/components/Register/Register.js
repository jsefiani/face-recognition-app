import React, { Component } from 'react';


class Register extends Component  {

    constructor(props) {
        super();
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    
    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    
    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmitChange = () => {
            if(this.state.email && this.state.name && this.state.password) {
                fetch(
                  "https://floating-taiga-13509.herokuapp.com/register",
                  {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password
                    })
                  }
                )
                  .then(response => response.json())
                  .then(user => {
                    if (user) {
                      console.log("Working");
                      this.props.onRouteChange("home");
                      this.props.loadUser(user);
                    }
                  });
            }   
    }

    render() {
        return (
            <article className="signup-form">
                <main className="pa4 white-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                                onClick={this.onSubmitChange}
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;