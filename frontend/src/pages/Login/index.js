import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import alertify from "alertifyjs";
import travelManager from "../../travelManager";

import "./styles.css";
import "./alertify.min.css";

import transportariImg from "../../assets/transportarilogo.png";

export default function Login() {
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function teste() {
      const check = await travelManager.methods.check().call();
      console.log(check);
    }
    teste();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    const registerName = localStorage.getItem("registerName");
    const registerEmail = localStorage.getItem("registerEmail");
    if (name === registerName || name === registerEmail) {
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
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
