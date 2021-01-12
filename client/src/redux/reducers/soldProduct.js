const initialState = [];

const soldProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SOLD_PRODUCT":
      console.log([...state, action.payload]);
      return [...state, action.payload];
    case "REMOVE_SOLD_PRODUCT":
      const filter = state.filter((product) => {
        return product.name !== action.payload.product.name;
      });
      return [...filter];
    case "CLEAR_SOLD_PRODUCT":
      return initialState;
    default:
      return state;
  }
};

export default soldProductReducer;
