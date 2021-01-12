import products from "../../configs/dummyProducts";

const initialState = products;

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTERED_PRODUCTS":
      return [...state];

    default:
      return state;
  }
};

export default productReducer;
