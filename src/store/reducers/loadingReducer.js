import * as ACTION_TYPES from "../actions/types";

export default function loadingReducer(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPES.API_START:
      return {
        ...state,
        [action.payload]: true,
      };
    case ACTION_TYPES.API_END:
      return {
        ...state,
        [action.payload]: false,
      };
    default:
      return state;
  }
}
