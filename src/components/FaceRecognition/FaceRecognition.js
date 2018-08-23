import React from 'react';
import FaceBox from '../FaceBox/FaceBox';

const FaceRecognition = ({ imageUrl, box }) => {
    const faceBoxCoordinates = Object.values(box).map(faceBoxCoordinate => {
        return <FaceBox
                    top={faceBoxCoordinate.topRow}
                    right={faceBoxCoordinate.rightCol}
                    left={faceBoxCoordinate.leftCol}
                    bottom={faceBoxCoordinate.bottomRow}
                />
    })
    
    return (
        <div className="center-box">
            <div className="image-box">
                <img id="inputImage" className="image" src={imageUrl} alt="" width="500px" height="auto" />
                { faceBoxCoordinates }
            </div>
        </div>
    )
}

export default FaceRecognition;