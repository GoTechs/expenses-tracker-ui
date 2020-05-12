import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const input = (props) => {
  let inputElement = null;
  let inputClasses = [styles.InputElement];
  let errorMessage = null;

  if (!props.valid && props.shouldValidate && props.touched && props.value) {
    inputClasses.push("Invalid");
    errorMessage = props.errorText;
  }
  let errorStyle = {
    color: "red",
  };

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={`${inputClasses.join(" ")}`}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.changed}
          noValidate
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={`${inputClasses.join(" ")}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.dateChange}
          noValidate
        />
      );
  }
  return (
    <div className="Input">
      <label>{props.label}</label>
      {inputElement}
      <div className="error-message" style={errorStyle}>
        {errorMessage}
      </div>
    </div>
  );
};

input.propTypes = {
  elementClass: PropTypes.string,
  errorText: PropTypes.string,
  className: PropTypes.any,
  label: PropTypes.string,
  shouldValidate: PropTypes.object,
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
};
export default input;
