import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import travelManager from "../../travelManager";

import "./styles.css";

export default function DriverRegister() {
  const [name, setName] = useState("");
  const [driverWallet, setClientWallet] = useState("");
  const history = useHistory();

  async function handleDriverRegister(e) {
    e.preventDefault();

    try {
      await travelManager.methods
        .createDriver(name, driverWallet)
        .send({ from: localStorage.getItem("userWallet") });

      history.push("/home");
    } catch (err) {
      alert("Ocorreu um erro ao cadastrar o motora");
    }
  }

  return (
    <div className="new-driver-container">
      <div className="content">
        <section>
          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#fff" />
            Voltar para Home
          </Link>
        </section>

        <form>
          <h1>Cadastrar novo motorista</h1>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Endereço da carteira"
            value={driverWallet}
            onChange={(e) => setClientWallet(e.target.value)}
          />

          <button
            onClick={handleDriverRegister}
            className="button"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
