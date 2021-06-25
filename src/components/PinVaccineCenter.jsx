import React from "react";
import { useState } from "react";
import axios from "axios";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Table,
  Alert,
} from "reactstrap";
import moment from "moment";

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
      <Form>
        <FormGroup row>
          <Label for="exampleEmail2" sm={2}>
            Enter Pincode:
          </Label>
          <Col sm={3}>
            <Input
              type="text"
              name="pincode"
              id="pincode"
              placeholder="enter your pincode"
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
          </Col>
          <Label for="exampleDate" sm={1}>
            Date:{" "}
          </Label>
          <Col sm={3}>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
              onChange={(e) =>
                setDate(moment(e.target.value).format("DD-MM-YYYY"))
              }
            />
          </Col>
        </FormGroup>
      </Form>
      <Button
        color="info"
        onClick={(event) => {
          setShow(true);
          handleSubmit(event);
        }}
      >
        OK
      </Button>{" "}
      <br />
      <br />
      <Table striped>
        <thead>
          <tr>
            <th>Center ID</th>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {session.length
            ? session.map((s) => (
                <tr>
                  <td>{s["center_id"]}</td>
                  <td>{s["name"]}</td>
                  <td>{s["address"]}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default PinVaccineCenter;
