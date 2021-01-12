import products from "../../configs/dummyProducts";

const initialState = {
  products: products,
  filteredProduct: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTERED_PRODUCTS":
      return {
        ...state,
        filteredProduct: action.payload.filteredProduct,
      };

    default:
      return state;
  }
};

export default productReducer;
