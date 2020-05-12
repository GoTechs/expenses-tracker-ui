import React, { Component } from "react";
import _ from "lodash";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AddModalContainer from "../../components/Modal";
import { connect } from "react-redux";
import actions from "../../store/actions";
import "./styles.css";

class AddExpensesModal extends Component {
  state = {
    formConfig: {
      amount: {
        elementType: "input",
        label: "Amount*",
        elementConfig: {
          type: "text",
          placeholder: "",
        },
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
        touched: false,
        errorText: "A number is expected.",
        value: "",
      },
      description: {
        elementType: "input",
        label: "Description*",
        elementConfig: {
          type: "text",
          placeholder: "",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        errorText: "Description is required",
        value: "",
      },
    },
    isValidForm: false,
    loading: false,
    expenseId: null,
  };

  componentWillReceiveProps(nextProps) {
    // handle edit form
    if (nextProps.showEditExpense !== this.props.showEditExpense) {
      const formData = { ...this.state.formConfig };
      formData["amount"].value = _.get(nextProps, "selectedExpense.amount");
      formData["description"].value = _.get(
        nextProps,
        "selectedExpense.description"
      );
      formData["amount"].valid = true;
      formData["description"].valid = true;
      const expenseId = _.get(nextProps, "selectedExpense._id");
      this.setState({ formConfig: formData, expenseId, isValidForm: true });
    } else {
      this.resetState();
    }
  }
  resetState = () => {
    const formConfigData = { ...this.state.formConfig };
    formConfigData["amount"].value = "";
    formConfigData["description"].value = "";
    this.setState({
      expenseId: null,
      formConfig: formConfigData,
      isValidForm: false,
    });
  };

  inputChangedHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let formIsValid = true;
    const updateFormConfig = { ...this.state.formConfig };
    updateFormConfig[name].value = value;
    updateFormConfig[name].touched = true;
    const rules = _.get(updateFormConfig[name], "validation");
    updateFormConfig[name].valid = this.checkValidity(value, rules);
    for (let identifier in updateFormConfig) {
      formIsValid = updateFormConfig[identifier].valid && formIsValid;
    }
    this.setState({ formConfig: updateFormConfig, isValidForm: formIsValid });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+(\.\d{0,9})?$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {};
    const { isValidForm, expenseId } = this.state;
    const formConfigData = { ...this.state.formConfig };
    if (isValidForm) {
      Object.keys(formConfigData).forEach(
        (identifier) =>
          (formData[identifier] = formConfigData[identifier].value)
      );
      this.props.showEditExpense
        ? this.props.editExpense(formData, expenseId)
        : this.props.addExpense(formData);
      this.props.closeModal();
    }
  };

  render() {
    const { formConfig, isValidForm } = this.state;
    const { showAddExpense, showEditExpense } = this.props;
    const showMode = showEditExpense ? showEditExpense : showAddExpense;
    return (
      <div className="add-expense-modal">
        <AddModalContainer
          show={showMode}
          onHide={this.props.closeModal}
          title={showEditExpense ? " Edit expense" : "Add new expense"}
        >
          <form onSubmit={this.handleSubmit} autoComplete="false">
            {_.map(formConfig, (input, key) => (
              <Input
                key={key}
                name={key}
                elementType={_.get(input, "elementType")}
                label={_.get(input, "label")}
                elementConfig={_.get(input, "elementConfig")}
                errorText={_.get(input, "errorText")}
                value={_.get(input, "value")}
                valid={_.get(input, "valid")}
                shouldValidate={_.get(input, "validation")}
                touched={_.get(input, "touched")}
                changed={this.inputChangedHandler}
              />
            ))}
            <div className="btns-group">
              <Button cancel onClick={this.props.closeModal}>
                Cancel
              </Button>
              <Button primary type="submit" disabled={!isValidForm}>
                Submit
              </Button>
            </div>
          </form>
        </AddModalContainer>
      </div>
    );
  }
}

AddExpensesModal.propTypes = {};
const mapStateToProps = (state) => {
  return {
    expenses: _.get(state, "expensesReducer.expenses"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editExpense: (dataForm, id) =>
      dispatch(actions.expensesActions.editExpense(dataForm, id)),
    addExpense: (dataForm) =>
      dispatch(actions.expensesActions.addExpense(dataForm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensesModal);
