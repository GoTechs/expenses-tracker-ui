import React, { Component } from "react";
import _ from "lodash";
import Button from "../../components/Button";
import Loader from "../../components/Loading";
import ExpensesModal from "../expensesModalContainer";
import { connect } from "react-redux";
import ConfirmDeleteModal from "../../components/Modal";
import DataTableExpenses from "../../components/DataTable";
import actions from "../../store/actions";
import * as expensesSelector from "../../store/selectors/expensesSelector";

import "./styles.css";

class ExpensesTracker extends Component {
  state = {
    showConfirmationModal: false,
    showAddExpense: false,
    showEditExpense: false,
    loading: false,
    expenseId: null,
    selectedExpense: null
  };

  componentDidMount() {
    this.props.getAllExpenses();
  }

  closeModal = () => {
    this.setState({
      showConfirmationModal: false,
      showAddExpense: false,
      showEditExpense: false,
      selectedExpense: null
    });
  };

  openConfirmationModal = (id) => {
    this.setState({ showConfirmationModal: true});
  };
  openAddModal = () => {
    this.setState({ showAddExpense: true });
  };
  openEditModal = (id) => {
    const selectedExpense = this.props.selectExpenseById(id);
    this.setState({ showEditExpense: true, expenseId: id, selectedExpense });
  };
 
  confirmDeleteClicked = () => {
    const { expenseId } = this.state;
    this.props.removeExpense(expenseId);
    this.closeModal();
  };
  render() {
    const {
      showConfirmationModal,
      showAddExpense,
      showEditExpense,
      selectedExpense
    } = this.state;
    return (
      <div className="expenses-tracker-container">
        {this.state.loading && <Loader />}
        <div className="header-container">
          <div className="expense-detail">
            <h1> Expense tracker</h1>
            <p>
              The sub-total of expenses is ${_.get(this.props, "sumExpenses")}
            </p>
            <p>The total with taxes is ${_.get(this.props, "getTotalTax")}</p>
          </div>

          <Button primary id="add-expense-btn" onClick={this.openAddModal}>
            Add new expense
          </Button>
        </div>
        <DataTableExpenses
          expenses={this.props.expenses}
          onDeleteClicked={this.openConfirmationModal}
          openAddModal={this.openAddModal}
          openEditModal={this.openEditModal}
          
        />
        <ExpensesModal
          showAddExpense={showAddExpense}
          showEditExpense={showEditExpense}
          closeModal={this.closeModal}
          selectedExpense={selectedExpense}
        />
        <ConfirmDeleteModal
          show={showConfirmationModal}
          onHide={this.closeModal}
          title="Confirm deletion"
        >
          <div className="delete-expense-modal">
            <p>This item will be deleted, are you sure?</p>
            <div className="btns-group">
              <Button cancel onClick={this.closeModal}>
                Cancel
              </Button>
              <Button confirm onClick={this.confirmDeleteClicked}>
                Confirm
              </Button>
            </div>
          </div>
        </ConfirmDeleteModal>
      </div>
    );
  }
}

ExpensesTracker.propTypes = {};
const mapStateToProps = (state) => {
  return {
    expenses: _.get(state, "expensesReducer.expenses"),
    sumExpenses: expensesSelector.getSumExpenses(state),
    getTotalTax: expensesSelector.getTotalTax(state),
    selectExpenseById: (id) => expensesSelector.selectExpenseById(state)(id)
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllExpenses: () => dispatch(actions.expensesActions.getAllExpenses()),
    removeExpense: (id) => dispatch(actions.expensesActions.removeExpense(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTracker);
