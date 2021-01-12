import React from "react";
import { Link } from "react-router-dom";

const WebHeader = () => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
        POS Application
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </header>
  );
};

export default WebHeader;
