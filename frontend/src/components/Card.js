import React, {useContext}  from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `gallery__like-button ${isLiked && 'gallery__like-button_active'}`
  );

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  }

  return (
    <div id={card._id}>
      <li className="gallery__item">
        <div className="gallery__square-photo-wrapper">
          <img
            src={card.link}
            alt={card.name}
            className="gallery__photo"
            onClick={handleCardClick}
          />
          {isOwn && <button className="gallery__remove-button" onClick={handleDeleteClick} />}
        </div>
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="gallery__like-count">{card.likes.length}</p>
        </div>
      </li>
    </div>
  );
}

export default Card;