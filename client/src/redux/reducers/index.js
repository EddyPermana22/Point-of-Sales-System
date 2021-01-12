import { combineReducers } from "redux";

import productReducer from "./product";
import soldProductReducer from "./soldProduct";

const rootReducer = combineReducers({
  products: productReducer,
  soldProducts: soldProductReducer,
});

export default rootReducer;
