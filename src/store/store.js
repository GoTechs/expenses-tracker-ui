import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import apiMiddleware from "./middleware/api";
import mainReducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ latency: 0 })
  : compose;
const store = createStore(
  mainReducer,
  composeEnhancer(applyMiddleware(thunk, apiMiddleware))
);

export default store;
