import React from "react";
import { Switch, Route } from "react-router-dom";

import WebHeader from "./components/WebHeader";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";

const POSApp = () => {
  return (
    <>
      <WebHeader />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Switch>
              <Route path="/" exact>
                <Dashboard />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
};

export default POSApp;
