import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import alertify from "alertifyjs";
import api from "../../services/api";

import "./styles.css";
import "./alertify.min.css";

import transportariImg from "../../assets/transportarilogo.png";

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/home");
    } catch (err) {
      alertify.error("Oh oh! Parece que algo deu errado... tente novamente!");
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#fff" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={transportariImg} alt="Heroes" />
    </div>
  );
}
