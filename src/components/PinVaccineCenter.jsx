import React from "react";
import { useState } from "react";
import axios from "axios";

import { Alert } from "reactstrap";
import CwPinForm from "./CwPinForm";
import CwTable from "./CwTable";

const PinVaccineCenter = (props) => {
  const [pincode, setPincode] = useState(0);
  const [session, setSession] = useState([]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const handleSubmit = (event) => {
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
        });
    }
    event.preventDefault();
  };
  const handleSetPincode = (pin) => {
    setPincode(pin);
  };
  const handleSetDate = (d) => {
    setDate(d);
  };
  const handleSetShow = (s) => {
    setShow(s);
  };
  return (
    <div>
      {show ? (
        <Alert
          color="info"
          onClose={() => setShow(false)}
          isOpen={show}
          toggle={() => setShow(false)}
          dismissible
        >
          {pincode === 0 ? (
            <div>Wrong Input...... Try Again !!</div>
          ) : (
            <div>
              Pincode: {pincode} &nbsp;&nbsp;&nbsp;&nbsp; Date: {date}
            </div>
          )}
        </Alert>
      ) : null}
      <br />
      <br />
      <br />
      <CwPinForm
        handlesetPin={handleSetPincode}
        handlesetDate={handleSetDate}
        handlesetShow={handleSetShow}
        handlesubmit={handleSubmit}
      />
      <br />
      <br />
      <CwTable vaccine_center={session} />
    </div>
  );
};

export default PinVaccineCenter;
