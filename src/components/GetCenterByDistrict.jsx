import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import CwTable from "./CwTable";

import CwMatform from "./CwMatform";
import CwMatCheckBox from "./CwMatCheckBox";
import CwMatBadge from "./CwMatBadge";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

const GetCenterByDistrict = () => {
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
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

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
          setTimerOn(true);
          setTime(0);
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

  useEffect(() => {
    let dist_interval_id;
    if (timerOn) {
      dist_interval_id = setInterval(() => {
        setDistrict_name(
          all_district_name[
            Math.floor(Math.random() * all_district_name.length)
          ]
        );
        setTime(0);
      }, 10000);
    } else if (!timerOn) {
      clearInterval(dist_interval_id);
    }
    return () => clearInterval(dist_interval_id);
  }, [all_district_name, timerOn]);

  useEffect(() => {
    setDistrict_name(
      all_district_name[Math.floor(Math.random() * all_district_name.length)]
    );
  }, [all_district_name]);

  const getVaccineByName = (name) => {
    let vcenter = all_center.filter((x) => {
      if (x["vaccine"] === name) return x;
    });
    return vcenter;
  };

  useEffect(() => {
    if (checkedA === true && checkedB === true) {
      setVaccine_session(all_center);
    } else if (checkedA === false && checkedB === true) {
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
      <CwMatBadge
        stateName={state_name}
        districtName={district_name}
        centerCount={all_center.length}
        Time={time}
        timeron={timerOn}
        setTimeron={(e) => setTimerOn(e)}
      />
      <br />
      <CwMatform
        stateName={state_name}
        handlechange={handleChange}
        allStates={all_state}
        setselectedDate={(e) => {
          setSelectedDate(e);
        }}
        districtName={district_name}
      />
      <br />
      <br />
      {/* <ToggleButtonGroup
        value={dButton}
        exclusive
        onChange={(e, nA) => {
          setDButton(nA);
        }}
        aria-label="districts"
      >
        {all_district_name.map((d) => {
          return (
            <ToggleButton value={d} aria-label={d}>
              {d}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <br /> */}
      <CwMatCheckBox
        checkeda={checkedA}
        checkedb={checkedB}
        setcheckedA={(e) => setCheckedA(e)}
        setcheckedB={(e) => setCheckedB(e)}
      />
      <CwTable vaccine_center={vaccine_session} />
    </div>
  );
};

export default GetCenterByDistrict;

//TODO:
//1. break into level 1 comp. (form, table, etc)............. done
//2. break into level 2 components (date, dropdown)
//3. filtering checkbox bug
//4. search textbox ...........(assigned to S.G.)
//5. filtering tab (all, covisheild, covaxine)
//6. show statename and `district name properly with center count(eg. KOLKATA 100)............ done
//7. show msg on 0 records
//8. on state change update district immediately........ imp................. done
//100. material ui er table ...........(assigned to S.G.)
//200. "Book" button in table ....on click popup with form!

//500. show districts as buttons.

//1000. show refresh timer with start stop resume (stopwatch app)................ done
//1001. stopwatch resume bug
