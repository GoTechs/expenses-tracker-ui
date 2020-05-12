/**
 *
 * Button
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import cn from "classnames";
import "./styles.css";

const Button = (props) => {
  

  const label =
    !isEmpty(props.label) && !props.children ? (
      <span>{props.label}</span>
    ) : (
      props.children
    );

  return (
    <button
      className={cn(
        "button",
        props.delete && "delete",
        props.cancel && "cancel",
        props.primary && "primary",
        props.confirm && "confirm",
        props.edit && "edit"
      )}
      id={props.id}
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  label: PropTypes.string,
  primary: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
