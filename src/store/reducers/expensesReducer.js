import * as ACTION_TYPES from "./../actions/types";

const initialState = {
  expenses: null,
};

export function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_EXPENSES:
      return {
        ...state,
        expenses: action.payload.data,
      };
    case ACTION_TYPES.REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (exp) => exp._id !== action.payload.expenseId
        ),
      };
    case ACTION_TYPES.SET_EXPENSE:
      return {
        ...state,
      };
    case ACTION_TYPES.ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload.expense, ...state.expenses],
      };
    default:
      return state;
  }
}
