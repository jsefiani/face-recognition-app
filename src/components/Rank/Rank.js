import React from 'react';


const Rank = ({ name, entries }) => {
    return (
        <div className="result-message">
            {`Hi ${name}, you've detected ${entries} ${entries > 1 || entries == 0 ? 'faces' : 'face'} so far`}
        </div>
    )
}

export default Rank;