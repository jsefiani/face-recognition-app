import React, { Component } from 'react';


class Signin extends Component {

    constructor(props) {
        super();
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }

    onEmailChange = event => {
        this.setState({
            signInEmail: event.target.value
        })
    }

    onPasswordChange = event => {
        this.setState({
            signInPassword: event.target.value
        })
    }

    onSubmitSingIn = () => {
        fetch('https://immense-lowlands-48531.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange("home");
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="signup-form">
                <main className="pa4 white-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <p>Use test@test.com</p>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                            <p>Use test</p>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba white-80 b--white bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSubmitSingIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim white db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Signin;