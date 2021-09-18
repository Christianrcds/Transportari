import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import alertify from "alertifyjs";
import api from "../../services/api";

import "./styles.css";
import "./alertify.min.css";

import transportariImg from "../../assets/transportarilogo.png";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();

    const registerName = localStorage.getItem("registerName");
    const registerEmail = localStorage.getItem("registerEmail");
    const registerPassword = localStorage.getItem("registerPassword");
    if (
      (name === registerName && password === registerPassword) ||
      (name === registerEmail && password === registerPassword)
    ) {
      localStorage.setItem("userName", registerName);
      history.push("/home");
    } else {
      alertify.error("Oh oh! Parece que algo deu errado... tente novamente!");
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            placeholder="Seu name ou email"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={{ marginTop: "16px" }}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#fff" />
            Cadastrar-se
          </Link>
        </form>
      </section>
      <img src={transportariImg} alt="Transportari" />
    </div>
  );
}
