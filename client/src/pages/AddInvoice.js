import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import AddProductModal from "../components/AddProductModal";
import API from "../configs/API";

const AddInvoice = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [salesPersonName, setSalesPersonName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [notes, setNotes] = useState("");
  const [filteredproducts, setFilteredProducts] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const products = useSelector((state) => state.products);
  const soldProducts = useSelector((state) => state.soldProducts);

  const productNameChange = (productName) => {
    if (productName === "") {
      setFilteredProducts([]);
      setShowSuggestion(false);
    } else {
      const nameRegex = new RegExp(`${productName}`, "i");
      const newFilteredProduct = products.filter((product) => {
        return nameRegex.test(product.name);
      });
      setFilteredProducts(newFilteredProduct);
      setShowSuggestion(true);
    }
  };

  const handleSuggestionClick = (product) => {
    setProductName(product.name);
    setShowSuggestion(false);
  };

  //handle product name change
  useEffect(() => {
    productNameChange(productName);

    return productNameChange;
  }, [productName]);

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      if (soldProducts.length) {
        const productData = soldProducts.map((product) => {
          return {
            name: product.product.name,
            picture: product.product.picture,
            price: +product.product.price,
            quantity: +product.quantity,
          };
        });
        const submitData = {
          customerName: customerName,
          salesPersonName: salesPersonName,
          notes: notes,
          products: productData,
        };

        console.log(submitData);
        const invoice = await API({
          method: "POST",
          url: "/invoices",
          data: submitData,
        });

        Swal.fire("Success!", "Invoice Already save!", "success").then(() => {
          dispatch({
            type: "CLEAR_SOLD_PRODUCT",
          });
          history.push("/invoices");
        });
      } else {
        Swal.fire(
          "Failed!",
          "Cannot Create Invoice With Empty Product!",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Failed!",
        `${error.response.data.message || "internal server error"}`,
        "error"
      );
    }
  };

  const getTotalPrice = () => {
    let total = 0;
    soldProducts.forEach((product) => {
      total += product.quantity * product.product.price;
    });

    return total;
  };

  const getTotalItems = () => {
    let total = 0;
    soldProducts.forEach((product) => {
      total += +product.quantity;
    });

    return total;
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Add Invoice</h1>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="salesName"
              aria-describedby="emailHelp"
              placeholder="Sales Person Name"
              value={salesPersonName}
              required
              onChange={(e) => setSalesPersonName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="customerName"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Notes"
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <AddProductModal />
      <hr />

      {soldProducts &&
        soldProducts.map((product, index) => {
          return (
            <>
              <div
                className="d-flex flex-row justify-content-around"
                key={index}
              >
                <div className="d-flex flex-row justify-content-between">
                  <img
                    src={product.product.picture}
                    className="img-fluid mr-3"
                    alt={product.product.name}
                    style={{ width: "100px" }}
                  />
                  <div className="d-flex flex-column">
                    <span>{product.product.name}</span>
                    <span>IDR {product.product.price}</span>
                  </div>
                </div>
                <div>
                  <span>quantity: {product.quantity}</span>
                </div>
                <div>
                  <span>IDR {product.quantity * product.product.price}</span>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      <p>TOTAL ITEMS : {getTotalItems()}</p>
      <p>TOTAL PRICE : {getTotalPrice()}</p>
      <button
        className="btn btn-block btn-primary my-3"
        onClick={handleSubmitProduct}
      >
        Submit
      </button>
    </>
  );
};

export default AddInvoice;
