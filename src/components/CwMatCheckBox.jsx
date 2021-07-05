import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CwMatCheckBox = (props) => {
  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.checkeda}
              onChange={() => {
                props.setcheckedA(!props.checkeda);
              }}
              name="checkedA"
            />
          }
          label="COVAXIN"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={props.checkedb}
              onChange={() => {
                props.setcheckedB(!props.checkedb);
              }}
              name="checkedB"
            />
          }
          label="COVISHEILD"
        />
      </FormGroup>
    </div>
  );
};

export default CwMatCheckBox;
