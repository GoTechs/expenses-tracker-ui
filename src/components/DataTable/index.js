import React from "react";
import ExpenseRow from "../ExpenseRow";

const dataTable = (props) => {
  const { expenses, openAddOrEditExpense, onDeleteClicked } = props;
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Taxes(15%)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses ? (
            expenses.map((expense) => (
              <ExpenseRow
                key={expense._id}
                expense={expense}
                onDeleteClicked={onDeleteClicked}
                openAddOrEditExpense={openAddOrEditExpense}
              />
            ))
          ) : (
            <tr>
              <td>
                <p>No expenses yet !</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default dataTable;
