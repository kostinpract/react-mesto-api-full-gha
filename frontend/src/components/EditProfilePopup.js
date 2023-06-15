import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="userinfo"
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      submitTitle="Сохранить"
    >
      <input
        id="name"
        name="userinfo-name"
        type="text"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        className="popup__form-field popup__form-field_data_name"
        onChange={handleNameChange}
        value={name || ""}
      />
      <span className="popup__form-warning popup__form-warning_field_name">Вы пропустили это поле.</span>
      <input
        id="status"
        name="userinfo-status"
        type="text"
        required
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        className="popup__form-field popup__form-field_data_status"
        onChange={handleDescriptionChange}
        value={description || ""}
      />
      <span className="popup__form-warning popup__form-warning_field_status">Вы пропустили это поле.</span>
    </PopupWithForm>
  );

}

export default EditProfilePopup;