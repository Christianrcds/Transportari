import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

export default function TravelRegister() {
  const [driverWallet, setDriverWallet] = useState("");
  const [clientWallet, setClientWallet] = useState("");
  const [shipperWallet, setShipperWallet] = useState("");
  const [travelCost, setTravelCost] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [product, setProduct] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [productHeight, setProductHeight] = useState("");

  const history = useHistory();

  async function handleTravelRegister(e) {
    e.preventDefault();

    try {
      history.push("/home");
    } catch (err) {
      alert("Ocorreu um erro ao cadastrar a viagem");
    }
  }

  return (
    <div className="new-travel-container">
      <div className="content">
        <section>
          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#fff" />
            Voltar para Home
          </Link>
        </section>

        <form>
          <h1>Cadastrar nova viagem</h1>
          <input
            placeholder="Carteira do motorista"
            value={driverWallet}
            onChange={(e) => setDriverWallet(e.target.value)}
          />

          <input
            placeholder="Carteira do cliente"
            value={clientWallet}
            onChange={(e) => setClientWallet(e.target.value)}
          />

          <input
            placeholder="Carteira da transportadora"
            value={shipperWallet}
            onChange={(e) => setShipperWallet(e.target.value)}
          />

          <input
            placeholder="Custo da viagem"
            value={travelCost}
            onChange={(e) => setTravelCost(e.target.value)}
          />

          <input
            placeholder="Origem da viagem"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />

          <input
            placeholder="Destino da viagem"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <input
            placeholder="Produto"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <input
            placeholder="Peso do produto"
            value={productWeight}
            onChange={(e) => setProductWeight(e.target.value)}
          />

          <input
            placeholder="Altura do produto"
            value={productHeight}
            onChange={(e) => setProductHeight(e.target.value)}
          />

          <input
            placeholder="Largura do produto"
            value={productWidth}
            onChange={(e) => setProductWidth(e.target.value)}
          />

          <button
            onClick={handleTravelRegister}
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
