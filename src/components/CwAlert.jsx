import React from "react";
import { Alert } from "reactstrap";

const CwAlert = (props) => {
  return (
    <Alert
      color="danger"
      onClose={() => props.setshow(false)}
      isOpen={props.s}
      toggle={() => props.setshow(false)}
      dismissible
    >
      {props.message}
    </Alert>
  );
};

export default CwAlert;
