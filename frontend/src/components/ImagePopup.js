import React  from 'react';

function ImagePopup(props) {
    return (
      <div className={`popup popup_photo ${props.card ? 'popup_shown' : ''}`}>
        <div className="popup__container popup__container_photo">
          <button className="popup__close-button popup__close-button_data_big-image" type="button" onClick={props.onClose}></button>
          <img className="popup__big-image-photo" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
          <p className="popup__big-image-title">{props.card ? props.card.name : ''}</p>
        </div>
      </div>
    );
}

export default ImagePopup;