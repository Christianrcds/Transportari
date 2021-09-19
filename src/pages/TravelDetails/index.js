import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import travelManager from "../../travelManager";

import "./styles.css";

export default function TravelRegister() {
  const [loading, setLoading] = useState(false);
  const [travel, setTravel] = useState();
  const [wallet, setWallet] = useState("");

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    async function getTravel() {
      try {
        const response = await travelManager.methods
          .getTravel(params.id)
          .call();
        setTravel(response);
      } catch (error) {
        console.log(error);
      }
    }

    getTravel();
  }, [params.id]);

  // async function handleTravelAlterAgreement(e) {
  //     e.preventDefault();
  //     setLoading(true);

  //     try {
  //         await travelManager.methods
  //             .createTravel(
  //                 clientWallet,
  //                 shipperWallet,
  //                 +travelCost,
  //                 origin,
  //                 product,
  //                 productWeight,
  //                 productWidth,
  //                 productHeight
  //             )
  //             .send({ from: localStorage.getItem("userWallet") });

  //         history.push("/home");
  //     } catch (err) {
  //         console.log(err);
  //         alert("Ocorreu um erro ao cadastrar a viagem");
  //     } finally {
  //         setLoading(false);
  //     }
  // }

  if (!travel) {
    return <div></div>;
  }
  return (
    <div className="travel-details-container">
      <div className="content">
        <section>
          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#fff" />
            Voltar para Home
          </Link>
        </section>
        <div>
          <h1>Informações da viagem</h1>
          <div className="infos-container">
            <h2>Transportadora: {travel.shipping_company[0]}</h2>
            <h2>Motorista: {travel.driver[0]}</h2>
            <h2>Cliente: {travel.client[0]}</h2>
            <h2>Produto: {travel.product.name}</h2>
            <h2>Origem: {travel.from}</h2>
            <h2>Destino: {travel.to}</h2>
            <h2>Status: {travel.status}</h2>

            <div className="status-items">
              <div className="status-items-wrapper">
                <h3>Motorista</h3>
                <div />
              </div>
              <div className="status-items-wrapper">
                <h3>Transportadora</h3>
                <div />
              </div>
              <div className="status-items-wrapper">
                <h3>Cliente</h3>
                <div />
              </div>
            </div>
          </div>
          <form>
            <input
              placeholder="Endereço da carteira para alteração de status"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />

            <button
              // onClick={handleTravelAlterAgreement}
              className="button"
              type="submit"
            >
              {loading ? <div className="loader"></div> : <>Alterar Status</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
