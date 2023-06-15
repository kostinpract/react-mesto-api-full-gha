import React  from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_shown' : ''}`}>
      <div className="popup__container">
        <button className={`popup__close-button popup__close-button_data_${props.name}`} type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{`${props.title}`}</h2>
        <form onSubmit={props.onSubmit} name={`form-${props.name}`} className={`popup__form popup__form_data_${props.name}`}>
          {props.children}
          <button type="submit" className={`popup__form-submit-button popup__form-submit-button_data_${props.name}`}>{props.submitTitle}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;