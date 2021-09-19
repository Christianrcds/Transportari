import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import travelManager from "../../travelManager";

import "./styles.css";

export default function TravelRegister() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      await travelManager.methods
        .createTravel(
          driverWallet,
          clientWallet,
          shipperWallet,
          +travelCost,
          origin,
          product,
          productWeight,
          productWidth,
          productHeight
        )
        .send({ from: localStorage.getItem("userWallet") });

      history.push("/home");
    } catch (err) {
      console.log(err);
      alert("Ocorreu um erro ao cadastrar a viagem");
    } finally {
      setLoading(false);
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
            type="number"
            placeholder="Custo da viagem (wei)"
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
            type="number"
            placeholder="Peso do produto"
            value={productWeight}
            onChange={(e) => setProductWeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Altura do produto"
            value={productHeight}
            onChange={(e) => setProductHeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Largura do produto"
            value={productWidth}
            onChange={(e) => setProductWidth(e.target.value)}
          />

          <button
            onClick={handleTravelRegister}
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
