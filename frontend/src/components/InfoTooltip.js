import React from 'react';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_shown' : ''}`}>
      <div className="popup__container">
        <button className={`popup__close-button popup__close-button_data_${props.name}`} type="button" onClick={props.onClose}></button>
        <div className="tooltip">
          <img className="tooltip__image" alt="Уведомление" src={props.image || './images/Problem.svg'} />
          <h2 className="tooltip__message">{props.message || 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;