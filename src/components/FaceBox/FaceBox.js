import React from 'react';

const FaceBox = ({ top, right, left, bottom }) => {
    let faceBoxPosition = {
        top: top,
        right: right,
        left: left,
        bottom: bottom
    }
    return (
        <div className="bounding-box" style={faceBoxPosition}>
        </div>
    )
}

export default FaceBox;