import React from 'react';


const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center-box">
            <div className="image-box">
                <img id="inputImage" className="image" src={imageUrl} alt="" width="500px" height="auto" />
                <div
                    className="bounding-box"
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        left: box.leftCol,
                        bottom: box.bottomRow
                    }}>
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;