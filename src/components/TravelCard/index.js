import React from "react";
import "./styles.css";

export default function TravelCard({
    id,
    company,
    client,
    driver,
    status,
    ...props
}) {
    return (
        <div className="container">
            <div className="wrapper">
                <div className="side-bar" />
                <div>
                    <div className="infos">ID:{id} </div>
                    <div className="infos">Company: {company} </div>
                    <div className="infos">Client: {client}</div>
                    <div className="infos">Driver: {driver}</div>
                    <div className="infos">Status: {status}</div>
                </div>
            </div>
        </div>
    );
}
