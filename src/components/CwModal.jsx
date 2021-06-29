import React from "react";
import Button from "@material-ui/core/Button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CwModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.modal_state} toggle={props.do_toggle}>
        <ModalHeader toggle={props.do_toggle}>Confirm ?</ModalHeader>
        <ModalBody>{props.message}</ModalBody>
        <ModalFooter>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.do_toggle();
              props.handlesubmit();
            }}
          >
            SUBMIT
          </Button>{" "}
          <Button
            variant="contained"
            color="secondary"
            onClick={props.do_toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CwModal;
