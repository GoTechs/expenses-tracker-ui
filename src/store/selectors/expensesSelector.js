import { createSelector } from "reselect";
import _ from "lodash";

const getExpensesData = (state) => _.get(state, "expensesReducer.expenses");

export const getSumExpenses = createSelector([getExpensesData], (expenses) => {
  return expenses && sum(expenses);
});

export const getTotalTax = createSelector([getExpensesData], (expenses) => {
  const sumTotalAmount = sum(expenses);
  return expenses && (sumTotalAmount + (sumTotalAmount * 15) / 100).toFixed(2);
});

export const selectExpenseById = createSelector(
  [getExpensesData],
  (expenses) => (id) => {
    return expenses && expenses.find((item) => item._id === id);
  }
);

const sum = (expenses) =>
  expenses && expenses.reduce((accum, current) => (accum += current.amount), 0);
