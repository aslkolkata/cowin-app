import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Table,
  Navbar,
  NavbarBrand,
  Alert,
} from "reactstrap";

import axios from "axios";
// let headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Accept-Encoding': 'identity',
//     'Content-Encoding': 'identity'
// };
// const client = axios.create({
//     auth: {
//       username: 'administrator',
//       password: 'admin'
//     },
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         // 'Accept-Encoding': 'identity',
//         // 'Content-Encoding': 'identity'
//     }
//   });

class VaccineCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      all_district: [],
      district: "Select District",
      all_states: [],
      state_name: "Select State",
      dropdownOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    //TODO: use arrow functions
  }
  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
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
      console.log("abcd");
      let state_id = this.state.all_states.filter((stat) => {
        if (stat["state_name"] === this.state.state_name) return stat;
      })[0];
      console.log(state_id);

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
    }
  }

  handleSubmit(event) {
    let id = this.state.all_district.filter((x) => {
      if (x["district_name"] === this.state.district) return x;
    })[0];
    axios
      .get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
          id["district_id"] +
          "&date=15-06-2021"
      )
      .then((resp) => {
        console.log(resp.data);
        this.setState({ posts: resp.data.sessions });
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  }
  render() {
    const { all_states } = this.state;

    return (
      <div>
        {/* <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
<DropdownToggle caret>
{this.state.state_name}
</DropdownToggle>
<DropdownMenu>
    {all_states.map(stat=> {return <DropdownItem id='state_name' key={stat.state_name} onClick={this.handleChange}>{stat.state_name}</DropdownItem>})}
</DropdownMenu>
</Dropdown> */}
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <div>
              {this.state.state_name === "Select State"
                ? null
                : this.state.state_name}{" "}
              /{" "}
              {this.state.district === "Select District"
                ? null
                : this.state.district}
            </div>
          </NavbarBrand>
        </Navbar>
        <br />
        <br />
        <br />
        <br />
        <form>
          <label for="state">Choose a State:&nbsp;</label>
          <select
            name="state_name"
            id="state"
            value={this.state.state_name}
            onChange={this.handleChange}
          >
            {all_states.map((stat) => (
              <option value={stat.state_name}>{stat.state_name}</option>
            ))}
          </select>
          <label for="district">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Choose a
            District:&nbsp;
          </label>
          <select
            name="district"
            id="district"
            value={this.state.district}
            onChange={this.handleChange}
          >
            {this.state.all_district.map((dis) => (
              <option value={dis.district_name}>{dis.district_name}</option>
            ))}
          </select>
        </form>
        <br />
        <Button
          color="info"
          onClick={(event) => {
            alert("hello");
            this.handleSubmit(event);
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
            {this.state.posts.length
              ? this.state.posts.map((s) => (
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

      /* // <div>
            //     List of posts
            //     {
                    
            //         posts.length ?
            //         posts.map(post => <div key={post.center_id}>center_id: {post.center_id}, name: {post.name}, address: {post.address}</div>) : null
            //     }
            // </div> */
    );
  }
}

export default VaccineCenter;
