import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../configs/API";

const Invoices = () => {
  const history = useHistory();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceList = await API({
          method: "GET",
          url: "/invoices",
        });
        console.log(invoiceList.data.invoices);
        setInvoices(invoiceList.data.invoices);
      } catch (error) {
        alert(error.response.data.message || "internal server error");
      }
    };
    fetchData();

    return fetchData;
  }, []);

  const addInvoiceButtonHandle = () => {
    history.push("/add-invoice");
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Invoices</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={addInvoiceButtonHandle}
          >
            Add Invoice
          </button>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">Salesperson</th>
            <th scope="col">Total Paid</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length &&
            invoices.map((invoice, index) => {
              return (
                <tr key={index}>
                  <td>{invoice.customerName}</td>
                  <td>{invoice.salesPersonName}</td>
                  <td>{invoice.total}</td>
                  <td>{invoice.notes}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Invoices;
