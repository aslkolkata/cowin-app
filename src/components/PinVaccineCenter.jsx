import React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {
  Alert,
  // Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CwPinForm from "./CwPinForm";
import CwTable from "./CwTable";

const PinVaccineCenter = (props) => {
  const [pincode, setPincode] = useState(0);
  const [session, setSession] = useState([]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleSubmit = () => {
    if (pincode !== 0) {
      var pin = parseInt(document.getElementById("pincode").value);
      axios
        .get(
          "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
            pin +
            "&date=" +
            date
        )
        .then((resp) => {
          console.log(resp.data);
          setSession(resp.data.sessions);
        })
        .catch((error) => {
          console.log(error);
          setShow(true);
        });
    }
    // event.preventDefault();
  };
  return (
    <div>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Confirm ?</ModalHeader>
          <ModalBody>
            <div>
              Pincode: {pincode} &nbsp;&nbsp;&nbsp;&nbsp; Date: {date}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                toggle();
                handleSubmit();
              }}
            >
              SUBMIT
            </Button>{" "}
            <Button variant="contained" color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* <div>
      </FormControl>
      <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={age}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      </div> */}
      {show ? (
        <Alert
          color="danger"
          onClose={() => setShow(false)}
          isOpen={show}
          toggle={() => setShow(false)}
          dismissible
        >
          <div>Wrong Pincode...... Try Again !!</div>
        </Alert>
      ) : null}
      <br />
      <br />
      <br />

      <CwPinForm
        handlesetPin={(pin) => {
          setPincode(pin);
        }}
        handlesetDate={(d) => {
          setDate(d);
        }}
        setsession={(s) => {
          setSession(s);
        }}
        handleToggle={toggle}
      />
      <br />
      <br />
      <CwTable vaccine_center={session} />
    </div>
  );
};

export default PinVaccineCenter;
