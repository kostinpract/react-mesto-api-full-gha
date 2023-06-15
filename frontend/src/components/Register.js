import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister, openTooltip, fillTooltip }) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(userData);
  }

  return (
    <section className="register">

      <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__form-field"
          id="email"
          placeholder="Email"
          name="email"
          type="email"
          value={userData.email || ""}
          onChange={handleChange}
        />
        <input
          className="register__form-field"
          id="password"
          placeholder="Пароль"
          name="password"
          type="password"
          value={userData.password || ""}
          onChange={handleChange}
        />
        <button type="submit" className="register__form-submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__info">
        Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link>
      </p>
    </section>
  );
}

export default Register;