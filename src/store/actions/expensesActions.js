import * as ACTION_TYPES from "./types";
import { apiAction } from "./apiActions.js";
import { toast } from "react-toastify";

export const getAllExpenses = () => {
  const url = "/expenses";
  return apiAction({
    url,
    onSuccess: ({ data }) => {
      return {
        type: ACTION_TYPES.GET_ALL_EXPENSES,
        payload: {
          data,
        },
      };
    },
    onFailure: () => {
      console.log("An error occured while fetching expenses");
    },
    label: ACTION_TYPES.REQUEST_ALL_EXPENSES,
  });
};
export const removeExpense = (id) => {
  const url = `/expense/${id}`;
  return apiAction({
    url,
    method: "DELETE",
    onSuccess: ({ message }) => {
      toast.success(message);
      return {
        type: ACTION_TYPES.REMOVE_EXPENSE,
        payload: {
          expenseId: id,
        },
      };
    },
    onFailure: () => {
      console.log("An error occured while removing expense");
    },
    label: ACTION_TYPES.REQUEST_REMOVE_EXPENSE,
  });
};
export const editExpense = (id) => {
  const url = `/expense/${id}`;
  return apiAction({
    url,
    method: "PUT",
    onSuccess: (data) => ({
      type: ACTION_TYPES.SET_EXPENSE,
      payload: {
        data,
      },
    }),
    onFailure: () => {
      console.log("An error occured while editing expense");
    },
    label: ACTION_TYPES.REQUEST_SET_EXPENSE,
  });
};

export const addExpense = (data) => {
  const url = `/expense`;
  return apiAction({
    url,
    method: "POST",
    data,
    onSuccess: ({ expense, message }) => {
      toast.success(message);
      return {
        type: ACTION_TYPES.ADD_EXPENSE,
        payload: {
          expense,
        },
      };
    },
    onFailure: () => {
      console.log("An error occured while adding new expense");
    },
    label: ACTION_TYPES.REQUEST_ADD_EXPENSE,
  });
};
