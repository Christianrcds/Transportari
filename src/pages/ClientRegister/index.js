import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import travelManager from "../../travelManager";

import "./styles.css";

export default function ClientRegister() {
  const [name, setName] = useState("");
  const [clientWallet, setClientWallet] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleClientRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await travelManager.methods
        .createClient(name, clientWallet, clientAddress)
        .send({ from: localStorage.getItem("userWallet") });

      history.push("/home");
    } catch (err) {
      alert("Ocorreu um erro ao cadastrar o cliente");
    } finally {
      setLoading(false);
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
            placeholder="Endereço do cliente"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />

          <button
            onClick={handleClientRegister}
            className="button"
            type="submit"
          >
            {loading ? <div className="loader"></div> : <>Cadastrar</>}
          </button>
        </form>
      </div>
    </div>
  );
}
