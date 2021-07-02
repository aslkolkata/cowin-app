import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CwTable from "./CwTable";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const GetCenterByDistrict = () => {
  const classes = useStyles();

  const [all_state, setAll_state] = useState([]);
  const [state_name, setState_name] = useState("");
  const [all_district, setAll_district] = useState([]);
  const [district_name, setDistrict_name] = useState("");
  const [all_district_name, setAll_district_name] = useState([]);
  const [vaccine_session, setVaccine_session] = useState([]);
  const [selectedDate, setSelectedDate] = useState("02-07-2021");
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(false);
  const [all_center, setAll_center] = useState([]);

  useEffect(() => {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((resp_s) => {
        console.log(resp_s.data.states);
        setAll_state(resp_s.data.states);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let state_id = all_state.filter((stat) => {
      if (stat["state_name"] === state_name) return stat;
    })[0];
    if (state_id) {
      axios({
        method: "get",
        url:
          "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" +
          state_id["state_id"],
      })
        .then((response) => {
          console.log(response.data.districts);
          setAll_district(response.data.districts);
          setAll_district_name(
            response.data.districts.map((d) => d.district_name)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAll_district([]);
    }
  }, [state_name]);

  const handleChange = (event) => {
    setState_name(event.target.value);
  };

  useInterval(() => {
    setDistrict_name(
      all_district_name[Math.floor(Math.random() * all_district_name.length)]
    );
  }, 30000);

  const getVaccineByName = (name) => {
    let vcenter = all_center.filter((x) => {
      if (x["vaccine"] === name) return x;
    });
    return vcenter;
  };

  useEffect(() => {
    if (checkedA === false && checkedB === true) {
      setVaccine_session(getVaccineByName("COVISHIELD"));
    } else if (checkedA === true && checkedB === false) {
      setVaccine_session(getVaccineByName("COVAXIN"));
    } else if (checkedA === false) {
      setVaccine_session(all_center);
    } else if (checkedB === false) {
      setVaccine_session(all_center);
    }
  }, [checkedA, checkedB]);

  useEffect(() => {
    let id = all_district.filter((x) => {
      if (x["district_name"] === district_name) return x;
    })[0];
    if (id) {
      axios({
        method: "get",
        url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict",
        params: {
          district_id: id["district_id"],
          date: selectedDate,
        },
      })
        .then((resp) => {
          console.log(resp.data.sessions);
          setVaccine_session(resp.data.sessions);
          setAll_center(resp.data.sessions);
          setCheckedA(false);
          setCheckedB(false);
          // TODO
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setVaccine_session([]);
      setAll_center([]);
    }
  }, [district_name, selectedDate]);

  return (
    <div>
      <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={state_name}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {all_state.map((stat) => {
            return (
              <MenuItem value={stat.state_name}>{stat.state_name}</MenuItem>
            );
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
        <br />

        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue=""
          className={classes.textField}
          onChange={(e) => {
            setSelectedDate(moment(e.target.value).format("DD-MM-YYYY"));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          disabled
          id="standard-disabled"
          label={district_name}
          defaultValue=""
        />
      </FormControl>
      <form className={classes.container} noValidate></form>
      <br />
      <br />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedA}
              onChange={() => {
                setCheckedA(!checkedA);
              }}
              name="checkedA"
            />
          }
          label="COVAXIN"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedB}
              onChange={() => {
                setCheckedB(!checkedB);
              }}
              name="checkedB"
            />
          }
          label="COVISHEILD"
        />
      </FormGroup>
      <CwTable vaccine_center={vaccine_session} />
    </div>
  );
};

export default GetCenterByDistrict;
