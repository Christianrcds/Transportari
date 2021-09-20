import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import travelManager from "../../travelManager";
import { statusTranslation } from "../../utils";
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
                const resopnse2 = await travelManager.methods.check().call();
                console.log(resopnse2);
            } catch (error) {
                console.log(error);
            }
        }
        if (!loading) getTravel();
    }, [params.id, loading]);

    async function handleTravelAlterAgreement(e) {
        e.preventDefault();
        setLoading(true);
        let value = 0;

        if (
            wallet === travel.client.client_wallet &&
            +travel.status.current_status === 0
        ) {
            value = travel.travel_cost;
        }

        if (
            wallet === travel.shipping_company.shipper_wallet &&
            +travel.status.current_status === 1
        ) {
            value = travel.travel_cost / 2;
        }

        try {
            await travelManager.methods
                .alterAgreement(+params.id)
                .send({ from: wallet, value: value });
        } catch (err) {
            console.log(err);
            alert("Ocorreu um erro alterar o status");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {!!travel && (
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
                                <h2>
                                    Transportadora: {travel.shipping_company[0]}
                                </h2>
                                <h2>Motorista: {travel.driver[0]}</h2>
                                <h2>Cliente: {travel.client[0]}</h2>
                                <h2>Produto: {travel.product.name}</h2>
                                <h2>Origem: {travel.from}</h2>
                                <h2>Destino: {travel.to}</h2>
                                <h2>
                                    Status:{" "}
                                    {
                                        statusTranslation[
                                            travel.status.current_status
                                        ].name
                                    }
                                </h2>

                                <div className="status-items">
                                    <div className="status-items-wrapper">
                                        <h3>Motorista</h3>
                                        <div
                                            style={{
                                                backgroundColor: travel.status
                                                    .driver
                                                    ? "#27ae60"
                                                    : "#f04040",
                                            }}
                                        />
                                    </div>
                                    <div className="status-items-wrapper">
                                        <h3>Transportadora</h3>
                                        <div
                                            style={{
                                                backgroundColor: travel.status
                                                    .shipping_company
                                                    ? "#27ae60"
                                                    : "#f04040",
                                            }}
                                        />
                                    </div>
                                    <div className="status-items-wrapper">
                                        <h3>Cliente</h3>
                                        <div
                                            style={{
                                                backgroundColor: travel.status
                                                    .client
                                                    ? "#27ae60"
                                                    : "#f04040",
                                            }}
                                        />
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
                                    onClick={handleTravelAlterAgreement}
                                    className="button"
                                    type="submit"
                                >
                                    {loading ? (
                                        <div className="loader"></div>
                                    ) : (
                                        <>Alterar Status</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
