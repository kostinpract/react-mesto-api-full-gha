import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, isOpen, onAddPlace }) {

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  // очищаем поля при открытии окна
  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleAddPlaceSubmit}
      name="addcard"
      title="Новое место"
      submitTitle="Сохранить"
    >
      <input
        id="title"
        onChange={handleTitleChange}
        value={title}
        name="addcard-card-title"
        type="text"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        className="popup__form-field popup__form-field_data_card-title"
      />
      <span className="popup__form-warning popup__form-warning_field_title">Вы пропустили это поле.</span>
      <input
        id="link"
        onChange={handleLinkChange}
        value={link}
        name="addcard-card-image"
        type="url"
        required
        placeholder="Ссылка на картинку"
        className="popup__form-field popup__form-field_data_card-image"
      />
      <span className="popup__form-warning popup__form-warning_field_link">Вы пропустили это поле.</span>
    </PopupWithForm>
  );

}

export default AddPlacePopup;