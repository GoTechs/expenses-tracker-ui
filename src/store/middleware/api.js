import axios from "axios";
import * as ACTION_TYPES from "../actions/types";
import { apiError, apiStart, apiEnd } from "../actions/apiActions.js";

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  if (!action) {
    return;
  }

  if (action.type !== ACTION_TYPES.API) return next(action);
  const {
    url,
    method,
    data,
    onSuccess,
    onFailure,
    label,
    headers,
  } = action.payload;
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  // axios default configs
  axios.defaults.baseURL = "http://localhost:8080/api";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  if (label) {
    dispatch(apiStart(label));
  }

  return axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then(({ data }) => {
      if (onSuccess) {
        dispatch(onSuccess(data));
      }
      return data;
    })
    .catch((error) => {
      console.error(error);
      dispatch(apiError(label, error));
      if (onFailure) {
        dispatch(onFailure(error));
      }
      throw error;
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};
export default apiMiddleware;
