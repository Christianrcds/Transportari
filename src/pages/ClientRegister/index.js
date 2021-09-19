import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import travelManager from "../../travelManager";

import "./styles.css";

export default function ClientRegister() {
  const [name, setName] = useState("");
  const [clientWallet, setClientWallet] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const history = useHistory();

  async function handleClientRegister(e) {
    e.preventDefault();

    try {
      await travelManager.methods
        .createClient(name, clientWallet, clientAddress)
        .send({ from: "0xbD26FF6470E831Ef9F203d79e1418Cf2CceAf3A6" });
      history.push("/home");
    } catch (err) {
      console.log(err);
      alert("Ocorreu um erro ao cadastrar o cliente");
    }
  }

  return (
    <div className="new-client-container">
      <div className="content">
        <section>
          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#fff" />
            Voltar para Home
          </Link>
        </section>

        <form>
          <h1>Cadastrar novo cliente</h1>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Endereço da carteira"
            value={clientWallet}
            onChange={(e) => setClientWallet(e.target.value)}
          />
          <input
            placeholder="Endereço da cliente"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />

          <button
            onClick={handleClientRegister}
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
