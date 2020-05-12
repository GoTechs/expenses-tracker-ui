import { combineReducers } from "redux";
import errorReducer from "./errorsReducer";
import loadingReducer from "./loadingReducer";
import { expensesReducer } from "./expensesReducer";

export default combineReducers({
  errorReducer,
  loadingReducer,
  expensesReducer,
});
