import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CwMatform = (props) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={props.stateName}
          onChange={props.handlechange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.allStates.map((stat) => {
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
            props.setselectedDate(moment(e.target.value).format("DD-MM-YYYY"));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </div>
  );
};

export default CwMatform;
