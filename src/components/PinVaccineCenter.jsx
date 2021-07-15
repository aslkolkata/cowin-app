import React from "react";
import { useState } from "react";
import axios from "axios";
import CwPinForm from "./CwPinForm";
import CwTable from "./CwTable";
import CwModal from "./CwModal";
import CwAlert from "./CwAlert";
import CwSearchField from "./CwSearchField";

const PinVaccineCenter = (props) => {
  const [pincode, setPincode] = useState(0);
  const [session, setSession] = useState([]);
  const [fltSsnList, setFltSsnList] = useState([]);
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
          setFltSsnList(resp.data.sessions);
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
        <CwModal
          modal_state={modal}
          do_toggle={toggle}
          handlesubmit={handleSubmit}
          message={
            <div>
              Pincode: {pincode} &nbsp;&nbsp;&nbsp;&nbsp; Date: {date}
            </div>
          }
        />
      </div>
      {show ? (
        <CwAlert
          setshow={setShow}
          message={<div>Wrong Pincode...... Try Again !!</div>}
          s={show}
        />
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
      <CwSearchField
        placeholder="Search by name"
        onChange={(value) =>
          setFltSsnList(
            session.filter(({ name }) => name.toLowerCase().includes(value))
          )
        }
      />
      <br />
      <CwTable vaccine_center={fltSsnList} />
    </div>
  );
};

export default PinVaccineCenter;
