import React from "react";
import Moment from "react-moment";
import Button from "../Button";
import "./styles.css";

const expenseRow = (props) => {
  const { _id, amount, description, date } = props.expense;
  return (
    <tr className="expense-row">
      <td className="desc">{description || ""}</td>
      <td className="amount">${amount || 0}</td>
      <td className="taxes">{(amount * 15) / 100}</td>
      <td className="date">
        <Moment format="DD-MM-YYYY [at] HH:mm">{date || ""}</Moment>
      </td>
      <td className="btns-group">
        <Button edit onClick={() => props.openEditModal(_id)}>
          Edit
        </Button>
        <Button delete onClick={() => props.onDeleteClicked(_id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default expenseRow;
