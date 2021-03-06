import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function TravelCard({
  id,
  company,
  client,
  driver,
  status,
  ...props
}) {
  return (
    <Link to={`travel/${id}`} className="disabled-link">
      <div className="container">
        <div className="wrapper">
          <div
            className="side-bar"
            style={{ backgroundColor: `${status?.color}` }}
          />
          <div>
            <div className="infos">ID: {id} </div>
            <div className="infos">Transportadora: {company} </div>
            <div className="infos">Cliente: {client}</div>
            <div className="infos">Motorista: {driver}</div>
            <div className="infos">Status: {status?.name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
