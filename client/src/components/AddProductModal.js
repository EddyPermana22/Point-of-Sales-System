import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const AddProductModal = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setProductName("");
    setFilteredProducts([]);
    setShowSuggestion(false);
    setShowSearchBox(true);
    setSelectedproduct(null);
    setQuantity(1);
    setShow(true);
  };

  const [productName, setProductName] = useState("");
  const [filteredproducts, setFilteredProducts] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(true);
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const products = useSelector((state) => state.products);

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
    setSelectedproduct(product);
    setShowSuggestion(false);
    setShowSearchBox(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSelectedproduct(filteredproducts[0]);
    setShowSuggestion(false);
    setShowSearchBox(false);
  };

  //handle product name change
  useEffect(() => {
    productNameChange(productName);

    return productNameChange;
  }, [productName]);

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    // alert()
    dispatch({
      type: "ADD_SOLD_PRODUCT",
      payload: {
        product: selectedproduct,
        quantity: quantity,
      },
    });
    handleClose()
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary">
        Add Product
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showSearchBox ? (
            <form onSubmit={handleSearchSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Product Name"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <ul className="list-group">
                  {filteredproducts.length ? (
                    filteredproducts.map((product, index) => {
                      return (
                        <li
                          key={index}
                          className="list-group-item"
                          style={
                            index === 0 ? { border: "1px solid blue" } : {}
                          }
                          onClick={() => handleSuggestionClick(product)}
                        >
                          <div className="d-flex flex-row">
                            <img
                              src={product.picture}
                              className="img-fluid mr-3"
                              alt={product.name}
                              style={{ width: "50px" }}
                            />
                            <div className="d-flex flex-column">
                              <span>{product.name}</span>
                              <span>IDR {product.price}</span>
                              <small>Stock {product.stock}</small>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : productName !== "" ? (
                    <span>Product Not Found!</span>
                  ) : null}
                </ul>
              </div>
            </form>
          ) : null}
          {showSearchBox === false && (
            <>
              <div className="d-flex flex-row">
                <img
                  src={selectedproduct.picture}
                  className="img-fluid mr-3"
                  alt={selectedproduct.name}
                  style={{ width: "50px" }}
                />
                <div className="d-flex flex-column">
                  <span>{selectedproduct.name}</span>
                  <span>IDR {selectedproduct.price}</span>
                  <small>Stock {selectedproduct.stock}</small>
                </div>
                <form class="form-inline" onSubmit={handleSubmitProduct}>
                  <div class="form-group mx-sm-3 mb-2">
                    <label for="quantity" class="sr-only">
                      Quantity
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="quantity"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="add"
                    className="btn btn-primary mb-2"
                  />
                </form>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
