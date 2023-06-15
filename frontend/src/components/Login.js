import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin, openTooltip, fillTooltip }) {
  const [userData, setUserData] = useState({
    password: '',
    email: '',
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
    if (!userData.email || !userData.password) {
      return;
    }
    handleLogin(userData);
  }

  return (
    <section className="register">
      <h2 className="register__title">Вход</h2>
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
          Войти
        </button>
      </form>
      <p className="register__info">
        Ещё нет аккаунта? <Link to="/sign-up" className="register__link">Зарегистрироваться</Link>
      </p>
    </section>
  );
}

export default Login;