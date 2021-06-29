import React, { Component } from "react";
import { Button, Label, Col, Input, Form, Row } from "reactstrap";
import moment from "moment";
import CwTable from "./CwTable";
import CwModal from "./CwModal";
import CwAlert from "./CwAlert";

import axios from "axios";

class VaccineCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      all_district: [],
      district: "Select District",
      all_states: [],
      state_name: "Select State",
      show_alert: false,
      date: "",
      modal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ modal: !this.state.modal });
  }
  setShowAlert(s) {
    this.setState({ show_alert: s });
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({ [event.target.name]: value });
  }

  componentDidMount() {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((resp_s) => {
        this.setState({ all_states: resp_s.data.states });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.state_name);
    if (prevState.state_name !== this.state.state_name) {
      let state_id = this.state.all_states.filter((stat) => {
        if (stat["state_name"] === this.state.state_name) return stat;
      })[0];
      console.log(state_id);
      if (state_id) {
        axios
          .get(
            "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" +
              state_id["state_id"]
          )
          .then((response) => {
            this.setState({ all_district: response.data.districts });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.setState({ all_district: [] });
      }
    }
  }

  handleSubmit(event) {
    let id = this.state.all_district.filter((x) => {
      if (x["district_name"] === this.state.district) return x;
    })[0];
    console.log(id);
    if (id) {
      axios
        .get(
          "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
            id["district_id"] +
            "&date=" +
            this.state.date
        )
        .then((resp) => {
          console.log(resp.data);
          this.setState({ posts: resp.data.sessions });
        })
        .catch((error) => {
          console.log(error);
        });
      // event.preventDefault();
    } else {
      this.setState({ posts: [] });
      this.setShowAlert(true);
    }
  }

  render() {
    const { all_states } = this.state;

    return (
      <div>
        <div>
          <CwModal
            modal_state={this.state.modal}
            do_toggle={this.toggle}
            handlesubmit={this.handleSubmit}
            message={
              <div>
                State: {this.state.state_name}
                <br />
                District: {this.state.district}
                <br />
                Date: {this.state.date}
              </div>
            }
          />
        </div>
        {this.state.show_alert ? (
          <CwAlert
            setshow={(show) => {
              this.setShowAlert(show);
            }}
            message={<div>Wrong Inputs...... Try Again !!</div>}
            s={this.state.show_alert}
          />
        ) : null}
        <br />
        <br />
        <br />
        <br />
        <Form>
          <Row form>
            <Label for="state" sm={1}>
              Choose a State:
            </Label>
            <Col sm={4}>
              <Input
                type="select"
                name="state_name"
                id="state"
                value={this.state.state_name}
                onChange={this.handleChange}
              >
                <option value="Select State">Select State</option>
                {all_states.map((stat) => (
                  <option value={stat.state_name}>{stat.state_name}</option>
                ))}
              </Input>
            </Col>
            <Label for="district" sm={2}>
              Choose a District:
            </Label>
            <Col sm={4}>
              {" "}
              <Input
                type="select"
                name="district"
                id="district"
                value={this.state.district}
                onChange={this.handleChange}
              >
                <option value="Select District">Select District</option>
                {this.state.all_district.map((dis) => (
                  <option value={dis.district_name}>{dis.district_name}</option>
                ))}
              </Input>
            </Col>
          </Row>
          <br />
          <Row form>
            <Col sm={0} md={{ size: 4, offset: 3 }}>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="date placeholder"
                onChange={(e) => {
                  this.setState({
                    date: moment(e.target.value).format("DD-MM-YYYY"),
                  });
                }}
              />
            </Col>
          </Row>
        </Form>
        <br />
        <Button
          color="info"
          onClick={(event) => {
            this.setState({ posts: [] });
            this.toggle();
          }}
        >
          OK
        </Button>{" "}
        <br />
        <br />
        <CwTable vaccine_center={this.state.posts} />
      </div>
    );
  }
}

export default VaccineCenter;
