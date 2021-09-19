import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import alertify from "alertifyjs";

import api from "../../services/api";

import "./styles.css";
import "./alertify.min.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userWallet, setUserWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem("registerName", name);
      localStorage.setItem("registerPassword", password);
      localStorage.setItem("registerEmail", email);
      localStorage.setItem("userWallet", userWallet);

      alertify.alert(
        `Obrigado por se cadastar em nosso sistema! Aqui está o seu ID de acesso, utilize: ${name} ou ${email}`,
        function () {}
      );

      history.push("/");
    } catch (err) {
      alertify.error("Teve um erro no cadastro, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro</h1>
          <p>Cadastre-se e comece a realizar entregas de forma mais segura.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#fff" />
            Voltar para o login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            placeholder="Endereço da carteira"
            value={userWallet}
            onChange={(e) => setUserWallet(e.target.value)}
          />

          <button className="button" type="submit">
            {loading ? <div className="loader"></div> : <>Cadastrar</>}
          </button>
        </form>
      </div>
    </div>
  );
}
