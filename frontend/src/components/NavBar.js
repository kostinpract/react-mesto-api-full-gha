import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({ ...props }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('sign-in');
  }

  return (
    <ul className="navbar__links">
      <li className="navbar__link">{props.userData.email || ""}</li>
      <li className="navbar__link"><button onClick={signOut} className="navbar__button">Выйти</button></li>
    </ul>
  )
}

export default NavBar;