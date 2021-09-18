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

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
    };

    try {
      const response = await api.post("ongs", data);

      alertify.alert(
        `Yeah! Obrigado por se cadastar em nosso sistema! Aqui está o seu ID de acesso: ${response.data.id} 🦸‍♂️`,
        function () {}
      );

      history.push("/");
    } catch (err) {
      alertify.error(
        "Ih, acho que o Superman encostou em uma Kryptonita! Teve um erro no cadastro, tente novamente."
      );
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

          <button className="button" type="submit">
            {" "}
            Cadastrar{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
