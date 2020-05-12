import * as ACTION_TYPES from "../actions/types";

export default function errorReducer(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPES.API_ERROR:
      return {
        ...state,
        [action.payload.label]: action.payload.error,
      };
    default:
      return state;
  }
}
