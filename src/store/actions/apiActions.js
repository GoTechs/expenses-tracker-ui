import * as ACTION_TYPES from "./types";

export const apiStart = (label) => ({
  type: ACTION_TYPES.API_START,
  payload: label,
});

export const apiEnd = (label) => ({
  type: ACTION_TYPES.API_END,
  payload: label,
});

export const apiError = (label, error) => ({
  type: ACTION_TYPES.API_ERROR,
  payload: {
    label,
    error,
  },
});

export function apiAction({
  url = "",
  method = "GET",
  data = null,
  // accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headersOverride = null,
}) {
  return {
    type: ACTION_TYPES.API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
      headersOverride,
    },
  };
}
