import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn, name, entries }) => {
        if(isSignedIn) {
            return (
                <nav className="navigation">
                    <Logo name={name} entries={entries}/>
                    <p onClick={() => onRouteChange('signout')} className="f3 link dim white underline pointer">Sign out</p>
                </nav>
            )
        } else {
            return (
                <nav className="navigation-notsignedin">
                    <p onClick={() => onRouteChange('signin')} className="f3 link dim white underline pointer">Sign in</p>
                    <p onClick={() => onRouteChange('register')} className="f3 link dim white underline pointer">Register</p>
                </nav>
            )
        }
}

export default Navigation;