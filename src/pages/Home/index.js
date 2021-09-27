import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import travelManager from "../../travelManager";
import TravelCard from "../../components/TravelCard";
import { statusTranslation } from "../../utils";
import "./styles.css";

export default function Home() {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(false);
  const userName = localStorage.getItem("userName");
  const history = useHistory();

  useEffect(() => {
    async function getTravels() {
      setLoading(true);
      try {
        const response = await travelManager.methods.getTravels().call();
        setTravels(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getTravels();
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
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            {travels.map((travel, idx) => {
              return (
                <TravelCard
                  id={idx}
                  company={travel.shipping_company.name}
                  client={travel.client.name}
                  driver={travel.driver.name}
                  status={statusTranslation[travel.status?.current_status]}
                />
              );
            })}
          </>
        )}
      </ul>
      <Link className="button d-flex justify-content-center" to="travel/new">
        Cadastrar nova viagem
      </Link>
    </div>
  );
}
