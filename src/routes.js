import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ClientRegister from "./pages/ClientRegister";
import DriverRegister from "./pages/DriverRegister";
import ShippingCompanyRegister from "./pages/ShippingCompanyRegister";
import TravelRegister from "./pages/TravelRegister";
import TravelDetails from "./pages/TravelDetails";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/client/new" component={ClientRegister} />
                <Route path="/driver/new" component={DriverRegister} />
                <Route path="/travel/new" component={TravelRegister} />
                <Route path="/travel/:id" component={TravelDetails} />
                <Route
                    path="/shipping_company/new"
                    component={ShippingCompanyRegister}
                />
            </Switch>
        </BrowserRouter>
    );
}
