import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from './ProtectedRoute';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  const [infoTooltipData, setInfoTooltipData] = React.useState({
    image: '',
    message: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    _id: '',
    email: '',
  });

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleLogin({ email, password }) {
    return Api.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserData({
            email: email,
          });
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setInfoTooltipData({
          message: `Что-то пошло не так! ${error} `,
          image: './images/Problem.svg'
        });
        handleInfoTooltip();
      });
  }

  function handleRegister({ email, password }) {
    return Api.register(email, password)
      .then(() => {
        navigate("/sign-in");
        setInfoTooltipData({
          message: 'Вы успешно зарегистрировались!',
          image: './images/Ok.svg'
        });
        handleInfoTooltip();
      })
      .catch((error) => {
        setInfoTooltipData({
          message: `Что-то пошло не так! ${error} `,
          image: './images/Problem.svg'
        });
        handleInfoTooltip();
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Api.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData({
            email: res.email,
            _id: res._id,
            name: res.name,
            about: res.about,
            avatar: res.avatar,
          })
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        Api.getUserInfo(),
        Api.getInitialCards()
      ]).then(([user, apiCards]) => {
        setCurrentUser(user);
        setCards([...apiCards]);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(data) {
    Api.setUserInfo(data.name, data.about)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    Api.setUserAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    if (card.owner === currentUser._id) {
      Api.removeCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleAddPlace(card) {
    Api.addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltip(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="body">
        <div className="page">

          <Header
            userData={userData}
            setUserData={setUserData}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  setCards={setCards}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} openTooltip={handleInfoTooltip} fillTooltip={setInfoTooltipData} />}

            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} openTooltip={handleInfoTooltip} fillTooltip={setInfoTooltipData} />}
            />
            <Route
              path="*"
              element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
            />
          </Routes>

          <Footer />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            image={infoTooltipData.image}
            message={infoTooltipData.message}
          />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        </div>
      </div>

    </CurrentUserContext.Provider >
  );
}

export default App;