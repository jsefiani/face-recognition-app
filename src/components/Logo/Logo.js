import React from 'react';
import Tilt from 'react-tilt';
import faceLogo from './faceLogo.png';
import Rank from '../Rank/Rank';

const Logo = ({route, name, entries}) => {
    return (
        <div>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner"><img src={faceLogo} alt="Face Recognition App" title="Face Recognition App Logo" /></div>
            </Tilt>
            <Rank name={name} entries={entries} route={route}/>
        </div>
    )
}

export default Logo;