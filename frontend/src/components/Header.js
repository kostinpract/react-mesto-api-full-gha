import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import NavBar from './NavBar';

function Header({ ...props }) {
  return (

    <header className="header">
      <img className="header__logo" src="./images/mesto-logo.svg" alt="Логотип сервиса Mesto" />
      <nav className="navbar">
        <Routes>
          <Route
            path="/"
            element={
              <NavBar
                userData={props.userData}
                setUserData={props.setUserData}
                loggedIn={props.loggedIn}
                setLoggedIn={props.setLoggedIn}
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Link className="navbar__button" to="/sign-in">Войти</Link>}
          />
          <Route
            path="/sign-in"
            element={<Link className="navbar__button" to="/sign-up">Зарегистрироваться</Link>}
          />
        </Routes>


      </nav>
    </header>
  );
}

export default Header;