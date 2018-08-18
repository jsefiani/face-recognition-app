import React from 'react';


const ImageLinkForm = ({onInputChange, onButtonSubmit }) => {
    return (
        <div className="link-form__box">
            <p className="link-form__title">
                {'This app will detect all faces in your pictures. Give it a try!'}
            </p>
            <div className="center-box">
                <input 
                    onChange={onInputChange}
                    className="link-form__input" 
                    type="url" 
                    placeholder="Provide a link to your picture"
                />
                <button 
                    className="link-form__button"
                    onClick={onButtonSubmit}
                >Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;