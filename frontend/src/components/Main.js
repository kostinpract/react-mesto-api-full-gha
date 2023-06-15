import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onCardClick, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__avatar">
          <button className="profile__editpic" onClick={onEditAvatar}></button>
          <img className="profile__userpic" src={currentUser.avatar} alt="Аватарка" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="cards">
        <ul className="gallery">
          {cards.map((card, index) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>

    </main>
  );
}

export default Main;