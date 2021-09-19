import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function ShippingCompanyRegister() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [shippingCompanyWallet, setClientWallet] = useState("");
    const history = useHistory();

    async function handleShippingCompanyRegister(e) {
        e.preventDefault();

        const data = {
            name,
            cpf,
            shippingCompanyWallet,
        };

        try {
            await api.post("shipping_company_register", data);

            history.push("/home");
        } catch (err) {
            alert("Ocorreu um erro ao cadastrar o shippingCompanye");
        }
    }

    return (
        <div className="new-shippingcompany-container">
            <div className="content">
                <section>
                    <Link className="back-link" to="/home">
                        <FiArrowLeft size={16} color="#fff" />
                        Voltar para Home
                    </Link>
                </section>

                <form>
                    <h1>Cadastrar nova transportadora</h1>
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <input
                        placeholder="Endereço da carteira"
                        value={shippingCompanyWallet}
                        onChange={(e) => setClientWallet(e.target.value)}
                    />

                    <button
                        onClick={handleShippingCompanyRegister}
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
