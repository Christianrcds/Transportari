import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import travelManager from "../../travelManager";
import "./styles.css";

export default function Home() {
  const [travels, setTravels] = useState([]);
  const userName = localStorage.getItem("userName");
  const history = useHistory();

  useEffect(() => {
    async function getClient() {
      const a = await travelManager.methods
        .getClient("0xbD26FF6470E831Ef9F203d79e1418Cf2CceAf3A6")
        .call();
      console.log(a);
    }
    getClient();
  }, []);

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="home-container">
      <header>
        <span>
          Bem vindo (a), <strong>{userName}</strong>!
        </span>

        <Link className="button" to="client/new">
          Cadastrar cliente
        </Link>
        <Link className="button" to="driver/new">
          Cadastrar motorista
        </Link>
        <Link className="button" to="shipping_company/new">
          Cadastrar transportadora
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#fff" />
        </button>
      </header>

      <h1>Viagens criadas</h1>

      <ul>
        {/* {travels.map((travel) => (
        ))} */}
      </ul>
    </div>
  );
}
