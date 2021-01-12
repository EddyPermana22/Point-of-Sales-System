import React from "react";
import { Switch, Route } from "react-router-dom";

import WebHeader from "./components/WebHeader";
import Sidebar from "./components/Sidebar";

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
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">Dashboard</h1>
                </div>
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
};

export default POSApp;
